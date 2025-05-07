import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EventsComponent } from './components/events/events.component';
import { MediaComponent } from './components/media/media.component';
import { RegistrationComponent } from './components/registration/registration.component';
import { ContactComponent } from './components/contact/contact.component';
import { RegistrationSuccessComponent } from './components/registration-success/registration-success.component';
import { AdminPortalComponent } from './components/admin-portal/admin-portal.component';
import { AlumniNetworkComponent } from './components/alumni-network/alumni-network.component';
import { SuccessStoriesComponent } from './components/success-stories/success-stories.component';
import { JoinAlumniNetworkComponent } from './components/join-alumni-network/join-alumni-network.component';
import { AboutUsComponent } from './components/about-us/about-us.component';

const routes: Routes = [
  { path: 'media', component: MediaComponent },
  { path: 'events', component: EventsComponent },
  { path: 'contact', component: ContactComponent },
  { path: 'about-us', component: AboutUsComponent },
  { path: 'alumni-network', component: AlumniNetworkComponent },
  { path: 'success-stories', component: SuccessStoriesComponent },
  { path: 'registration-success', component: RegistrationSuccessComponent },
  { path: 'app-registration/:id', component: RegistrationComponent },
  { path: 'admin', component: AdminPortalComponent },
  { path: 'join-alumni-network', component: JoinAlumniNetworkComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
