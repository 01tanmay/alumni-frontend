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
