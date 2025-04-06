import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EventsComponent } from './components/events/events.component';
import { MediaComponent } from './components/media/media.component';
import { RegistrationComponent } from './components/registration/registration.component';
import { ContactComponent } from './components/contact/contact.component';

const routes: Routes = [
  { path: 'media', component: MediaComponent },
  { path: 'events', component: EventsComponent },
  { path: 'contact', component: ContactComponent },
  //{ path: '**', redirectTo: 'media' }, // Catch-all for invalid URLs
  //{ path: 'registration', component: RegistrationComponent },
  //{ path: '', redirectTo: 'media', pathMatch: 'full' },
  //{ path: 'app-events', component: EventsComponent },
  { path: 'app-registration/:id', component: RegistrationComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
