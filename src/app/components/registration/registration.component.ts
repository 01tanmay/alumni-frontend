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

  constructor(private alumniService: AlumniService) {}

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
}
