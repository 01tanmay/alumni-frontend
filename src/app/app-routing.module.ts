import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EventsComponent } from './components/events/events.component';
import { MediaComponent } from './components/media/media.component';
import { ContactComponent } from './components/contact/contact.component';

const routes: Routes = [
  { path: 'media', component: MediaComponent },
  { path: 'events', component: EventsComponent },
  { path: 'contact', component: ContactComponent },
  { path: '', redirectTo: 'media', pathMatch: 'full' }, ];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
