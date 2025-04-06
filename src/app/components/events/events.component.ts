import { Component, OnInit } from '@angular/core';
import { EventService } from '../../services/event.service';
import { Event } from '../../models/event.model';

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.css']
})
export class EventsComponent implements OnInit {
  events: Event[] = [];
  errorMessage: string = '';

  constructor(private eventService: EventService) {}

  ngOnInit(): void {
    this.eventService.getAllEvents().subscribe({
      next: (data) => {
        this.events = data;
      },
      error: (error) => {
        this.errorMessage = 'Failed to load events.';
        console.error(error);
      }
    });
  }
}
