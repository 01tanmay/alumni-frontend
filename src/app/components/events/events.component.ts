import { Component, OnInit } from '@angular/core';
import { EventService } from '../../services/event.service';
import { Router } from '@angular/router';
import { Event } from '../../models/event.model';

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.css'],
})
export class EventsComponent implements OnInit {
  events: Event[] = [];
  errorMessage: string = '';

  backgroundStyle = {
    'background-image': "linear-gradient(to bottom, rgba(0,0,0,0.5), rgba(0,0,0,0.6)), url('assets/images/building.jpg')",
    'background-size': 'cover',
    'background-position': 'center',
    'min-height': '100vh',
    'padding': '30px 20px 60px',
    'color': '#fff'
  };

  constructor(
    private eventService: EventService,
    private router: Router
  ) {}

  ngOnInit() {
    this.eventService.getAllEvents().subscribe(
      (data) => (this.events = data),
      (error) => (this.errorMessage = 'Failed to load events')
    );
  }

  goToRegistration(eventId: number) {
    this.router.navigate(['/app-registration', eventId]);
  }
}
