import { Component, OnInit } from '@angular/core';
import { EventService } from '../../services/event.service';

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.css'],
})
export class EventsComponent implements OnInit {
  events: any[] = [];
  errorMessage: string = '';

  constructor(private eventService: EventService) {}

  ngOnInit() {
    this.getEvents();
  }

  getEvents() {
    this.eventService.getEvents().subscribe(
      (data: any) => {
        this.events = data;
        if (this.events.length === 0) {
          this.errorMessage = 'No upcoming events at the moment.';
        }
      },
      (error) => {
        console.error('Error fetching events:', error);
        this.errorMessage = 'Failed to fetch events. Please try again later.';
      }
    );
  }
}
