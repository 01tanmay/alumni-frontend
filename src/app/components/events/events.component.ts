import { Component, OnInit } from '@angular/core';
import { EventService } from '../../services/event.service';

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.css'],
})
export class EventsComponent implements OnInit {
  events: any[] = [];

  constructor(private eventService: EventService) {}

  ngOnInit() {
    this.eventService.getEvents().subscribe((data) => {
      console.log('Events Data:', data); // Log to check if data is received
      this.events = data;
    });
  }

  register(eventId: string) {
    alert(`Registered for event ID: ${eventId}`);
  }
}
