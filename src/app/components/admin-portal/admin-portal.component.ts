import { Component, OnInit } from '@angular/core';
import { AdminService } from '../../services/admin.service';
import { EventService } from '../../services/event.service';

@Component({
  selector: 'app-admin-portal',
  templateUrl: './admin-portal.component.html',
  styleUrls: ['./admin-portal.component.css']
})
export class AdminPortalComponent implements OnInit {
  username: string = '';
  password: string = '';
  isLoggedIn: boolean = false;

  selectedFile: File | null = null;
  mediaUploadSuccess: string = '';
  mediaUploadError: string = '';

  event: any = {
    eventName: '',
    description: '',
    eventDate: '',
    venue: '',
    maxAttendees: ''
  };
  eventSuccess: string = '';
  eventError: string = '';

  eventList: any[] = [];
  selectedEventId: number | null = null;
  deleteMessage: string = '';

  constructor(private adminService: AdminService, private eventService: EventService) {}

  ngOnInit(): void {
    this.fetchEvents();
  }

  login(): void {
    if (this.username && this.password) {
      this.adminService.setCredentials(this.username, this.password);
      this.isLoggedIn = true;
    } else {
      alert('Please enter both username and password.');
    }
  }

  onFileSelected(event: any): void {
    this.selectedFile = event.target.files[0];
  }

  uploadMedia(): void {
    this.mediaUploadSuccess = '';
    this.mediaUploadError = '';
    if (!this.selectedFile) {
      this.mediaUploadError = 'Please select a file first.';
      return;
    }

    this.adminService.uploadMedia(this.selectedFile).subscribe({
      next: () => {
        this.mediaUploadSuccess = 'Media uploaded successfully.';
        this.selectedFile = null;
      },
      error: () => {
        this.mediaUploadError = 'Failed to upload media.';
      }
    });
  }

  registerEvent(): void {
    this.eventSuccess = '';
    this.eventError = '';
    this.adminService.createEvent(this.event).subscribe({
      next: () => {
        this.eventSuccess = 'Event registered successfully.';
        this.fetchEvents(); // refresh dropdown
        this.event = {
          eventName: '',
          description: '',
          eventDate: '',
          venue: '',
          maxAttendees: ''
        };
      },
      error: () => {
        this.eventError = 'Failed to register event.';
      }
    });
  }

  fetchEvents(): void {
    this.eventService.getAllEvents().subscribe({
      next: (events) => {
        this.eventList = events;
      },
      error: () => {
        console.error('Error fetching events.');
      }
    });
  }

  deleteSelectedEvent(): void {
    if (!this.selectedEventId) return;

    this.adminService.deleteEvent(this.selectedEventId).subscribe({
      next: (msg) => {
        this.deleteMessage = msg;
        this.fetchEvents();
        this.selectedEventId = null;
      },
      error: () => {
        this.deleteMessage = 'Failed to delete event.';
      }
    });
  }

  logout(): void {
    this.isLoggedIn = false;
    this.username = '';
    this.password = '';
  }
}
