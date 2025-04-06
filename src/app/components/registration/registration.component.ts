import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AlumniService } from '../../services/alumni.service';
import { EventService } from '../../services/event.service';
import { Event } from '../../models/event.model';

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
    marksheetUrl: '',
    utrNumber: '',
    paymentMethod: '',
    eventId: null
  };

  selectedFile: File | null = null;
  passoutYears: number[] = [];
  paymentInfo: string = '';
  eventName: string = '';

  constructor(
    private alumniService: AlumniService,
    private eventService: EventService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.generatePassoutYears();

    this.route.params.subscribe(params => {
      const eventIdFromRoute = +params['id'];
      if (!isNaN(eventIdFromRoute)) {
        this.userData.eventId = eventIdFromRoute;

        this.eventService.getEventById(eventIdFromRoute).subscribe(
          (res: any) => {
            const event: Event = res;
            this.eventName = event.eventName;
          },
          () => {
            this.eventName = 'Unknown Event';
          }
        );
      }
    });
  }

  onFileChange(event: any) {
    if (event.target.files.length > 0) {
      this.selectedFile = event.target.files[0];
    }
  }

  register() {
    if (!this.userData.fullName || !this.userData.contactNumber || !this.selectedFile || !this.userData.eventId) {
      alert('Please fill in all required fields and upload your marksheet.');
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
      () => alert('✅ Registration successful! Please wait for confirmation.'),
      () => alert('❌ Registration failed. Please try again.')
    );
  }

  generatePassoutYears() {
    const currentYear = new Date().getFullYear();
    this.passoutYears = Array.from({ length: currentYear - 2013 }, (_, i) => 2014 + i);
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
}
