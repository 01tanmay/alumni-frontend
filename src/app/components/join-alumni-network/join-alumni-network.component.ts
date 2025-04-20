import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { Alumni, AlumniService } from '../../services/alumni.service';

@Component({
  selector: 'app-join-alumni-network',
  templateUrl: './join-alumni-network.component.html',
  styleUrl: './join-alumni-network.component.css'
})
export class JoinAlumniNetworkComponent {
  alumni: Alumni = {
    fullName: '',
    graduationYear: new Date().getFullYear(),
    city: '',
    profession: '',
    email: '',
    linkedin: '',
    bio: '',
    showEmail: false
  };

  constructor(private alumniService: AlumniService, private router: Router) {}

  submit() {
    this.alumniService.addAlumni(this.alumni).subscribe(() => {
      alert('Alumni onboarded successfully!');
      this.router.navigate(['/alumni-network']);
    });
  }

}
