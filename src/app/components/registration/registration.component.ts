import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RegisterService } from '../../services/register.service';
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
    email: '',
    passoutYear: '',
    dob: '',
    utrNumber: '',
    paymentMethod: '',
    eventId: null
  };

  passoutYears: number[] = [];
  paymentInfo: string = '';
  eventName: string = '';

  constructor(
    private registerService: RegisterService,
    private eventService: EventService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.passoutYears = Array.from({ length: 2010 - 1995 + 1 }, (_, i) => 1995 + i);

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

  isFormInvalid(): boolean {
    return (
      !this.userData.fullName ||
      !this.userData.address ||
      this.userData.address.length < 5 ||
      !this.userData.profession ||
      !this.userData.contactNumber ||
      !/^\d{10}$/.test(this.userData.contactNumber) ||
      !this.userData.email ||
      !this.userData.dob ||
      !this.userData.passoutYear ||
      !this.userData.paymentMethod ||
      !this.userData.utrNumber ||
      !this.userData.eventId
    );
  }

  register() {
    console.log('register clicked');
    const formData = new FormData();
    Object.keys(this.userData).forEach((key) => {
      formData.append(key, this.userData[key]);
    });

    this.registerService.registerAlumni(formData).subscribe(
      () => {
        alert('🎉 Registration successful!');
        this.router.navigate(['/registration-success'], {
          state: {
              fullName: this.userData.fullName,
              email: this.userData.email
            }
          });
        //    this.router.navigate(['/app-registration', eventId]);
      },
      () => alert('❌ Registration failed. Please try again.')
    );
  }
}
