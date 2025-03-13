import { Component } from '@angular/core';
import { AlumniService } from '../../services/alumni.service'; // Ensure service is imported

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrl: './registration.component.css'
})
export class RegistrationComponent {
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
  };

  selectedFile: File | null = null;
  passoutYears: number[] = [];
  paymentInfo: string = ''; // Holds dynamic payment instructions

  constructor(private alumniService: AlumniService) { this.generatePassoutYears(); }

  onFileChange(event: any) {
    if (event.target.files.length > 0) {
      this.selectedFile = event.target.files[0];
    }
  }

  register() {
    if (!this.userData.fullName || !this.userData.contactNumber || !this.selectedFile) {
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
      () => alert('Registration successful! Please wait for confirmation.'),
      () => alert('Registration failed. Please try again.')
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
