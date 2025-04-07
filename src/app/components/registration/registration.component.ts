import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AlumniService } from '../../services/alumni.service';
import { EventService } from '../../services/event.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {
  userData: any = {
    fullName: '',
    address: '',
    profession: '',
    contactNumber: '',
    passoutYear: '',
    dob: '',
    seatNumber: '',  // Added seatNumber here
    marksheetUrl: '',
    utrNumber: '',
    paymentMethod: '',
    eventId: null
  };

  selectedFile: File | null = null;
  passoutYears: number[] = [];
  paymentInfo: string = '';
  eventName: string = '';

  marksheetValidated = false;
  paymentValidated = false;
  marksheetStatus: 'success' | 'error' | '' = '';
  paymentStatus: 'success' | 'error' | '' = '';

  constructor(
    private alumniService: AlumniService,
    private eventService: EventService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.generatePassoutYears();

    this.route.params.subscribe(params => {
      const eventIdFromRoute = +params['id'];
      if (!isNaN(eventIdFromRoute)) {
        this.userData.eventId = eventIdFromRoute;

        this.eventService.getEventById(eventIdFromRoute).subscribe(
          (res: any) => this.eventName = res.eventName,
          () => this.eventName = 'Unknown Event'
        );
      }
    });
  }

  generatePassoutYears() {
    const currentYear = new Date().getFullYear();
    this.passoutYears = Array.from({ length: currentYear - 2002 + 1 }, (_, i) => 2002 + i);
  }

  onFileChange(event: any) {
    if (event.target.files.length > 0) {
      this.selectedFile = event.target.files[0];
      this.marksheetValidated = false;
      this.marksheetStatus = '';
    }
  }

  validateMarksheet() {
    this.marksheetStatus = '';

    if (!this.selectedFile || !this.userData.passoutYear || !this.userData.seatNumber) {
      alert('Please select passout year, enter seat number, and upload marksheet.');
      return;
    }

    this.alumniService.validateMarksheet(this.selectedFile, this.userData.passoutYear, this.userData.seatNumber)
      .subscribe({
        next: (s3Url: string) => {
          this.userData.marksheetUrl = s3Url;
          this.marksheetValidated = true;
          this.marksheetStatus = 'success';
        },
        error: (err) => {
          console.error('❌ Marksheet validation failed', err);
          this.marksheetValidated = false;
          this.marksheetStatus = 'error';
        }
      });
  }

  updatePaymentInfo() {
    const method = this.userData.paymentMethod;
    if (method === 'UPI') {
      this.paymentInfo = 'Scan the UPI QR Code or use UPI ID: abc@upi';
    } else if (method === 'NEFT') {
      this.paymentInfo = 'Use NEFT details: Account No: 123456789, IFSC: ABCD0123456';
    } else if (method === 'Bank Transfer') {
      this.paymentInfo = 'Transfer to Account No: 987654321, Bank: XYZ Bank, IFSC: XYZB0009876';
    } else {
      this.paymentInfo = '';
    }
  }

  validatePayment() {
    this.paymentStatus = '';

    if (!this.userData.utrNumber || !this.userData.passoutYear) {
      alert('Please enter UTR number and passout year.');
      return;
    }

    this.alumniService.validatePayment(this.userData.utrNumber, this.userData.passoutYear)
      .subscribe({
        next: () => {
          this.paymentValidated = true;
          this.paymentStatus = 'success';
        },
        error: (err) => {
          console.error('❌ Payment validation failed', err);
          this.paymentValidated = false;
          this.paymentStatus = 'error';
        }
      });
  }

  isFormInvalid(): boolean {
    return (
      !this.userData.fullName ||
      !this.userData.address ||
      this.userData.address.length < 5 ||
      !this.userData.profession ||
      !this.userData.contactNumber ||
      !/^\d{10}$/.test(this.userData.contactNumber) ||
      !this.userData.dob
    );
  }

  register() {
    if (!this.marksheetValidated || !this.paymentValidated) {
      alert('Please complete validations before registering.');
      return;
    }

    const formData = new FormData();
    Object.keys(this.userData).forEach((key) => {
      formData.append(key, this.userData[key]);
    });

    if (this.selectedFile) {
      formData.append('marksheet', this.selectedFile);
    }

    this.alumniService.registerAlumni(formData).subscribe(
      () => {
        alert('🎉 Registration successful!');
        this.router.navigate(['/registration-success']);
      },
      () => alert('❌ Registration failed. Please try again.')
    );
  }
}
