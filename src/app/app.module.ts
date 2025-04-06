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

import { AlumniService } from './services/alumni.service';

import { HttpClientModule } from '@angular/common/http';
import { RegistrationSuccessComponent } from './components/registration-success/registration-success.component';

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
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    CommonModule,
  ],
  providers: [AlumniService],
  bootstrap: [AppComponent]
})
export class AppModule { }
