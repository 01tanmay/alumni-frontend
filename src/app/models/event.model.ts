export interface Event {
  id: number;
  eventName: string;
  description: string;
  eventDate: string; // ISO date string (e.g. "2025-05-01")
  venue: string;
  maxAttendees: number;
  registeredAttendees: number;
}
