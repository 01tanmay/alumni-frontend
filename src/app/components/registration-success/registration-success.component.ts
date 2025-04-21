import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registration-success',
  templateUrl: './registration-success.component.html',
  styleUrl: './registration-success.component.css'
})
export class RegistrationSuccessComponent {
 fullName: string = '';
  email: string = '';

  constructor(private router: Router) {
    const navState = this.router.getCurrentNavigation()?.extras?.state;
    if (navState) {
      this.fullName = navState['fullName'] || '';
      this.email = navState['email'] || '';
    }
  }
}
