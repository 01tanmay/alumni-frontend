import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { MediaComponent } from './components/media/media.component';
import { EventsComponent } from './components/events/events.component';
import { RegistrationComponent } from './components/registration/registration.component';
import { ContactComponent } from './components/contact/contact.component';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AlumniService } from './services/alumni.service';

import { HttpClientModule } from '@angular/common/http';
import { RegistrationSuccessComponent } from './components/registration-success/registration-success.component';
import { AdminPortalComponent } from './components/admin-portal/admin-portal.component';
import { AlumniNetworkComponent } from './components/alumni-network/alumni-network.component';
import { SuccessStoriesComponent } from './components/success-stories/success-stories.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    MediaComponent,
    EventsComponent,
    RegistrationComponent,
    ContactComponent,
    RegistrationSuccessComponent,
    AdminPortalComponent,
    AlumniNetworkComponent,
    SuccessStoriesComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    CommonModule,
    BrowserAnimationsModule,
    MatSnackBarModule,
  ],
  providers: [AlumniService],
  bootstrap: [AppComponent]
})
export class AppModule { }
