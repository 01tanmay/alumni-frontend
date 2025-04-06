import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiEndpoints } from '../config/api.config';

@Injectable({ providedIn: 'root' })
export class EventService {
  private apiUrl = ApiEndpoints.events;

  constructor(private http: HttpClient) {}

  getEvents(): Observable<any> {
    return this.http.get(`${this.apiUrl}/all`);
  }
}
