import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiEndpoints } from '../config/api.config';

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  private mediaApiUrl = ApiEndpoints.media;
  private eventApiUrl = ApiEndpoints.events;

  private username: string = '';
  private password: string = '';

  constructor(private http: HttpClient) {}

  setCredentials(username: string, password: string): void {
    this.username = username;
    this.password = password;
  }

  private getAuthHeaders(): HttpHeaders {
    const token = btoa(`${this.username}:${this.password}`);
    return new HttpHeaders({
      Authorization: `Basic ${token}`
    });
  }

  uploadMedia(file: File): Observable<any> {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('fileName', file.name);
    formData.append('fileType', file.type);

    return this.http.post(`${this.mediaApiUrl}/upload`, formData, {
      headers: this.getAuthHeaders()
    });
  }

  createEvent(event: any): Observable<any> {
    return this.http.post(`${this.eventApiUrl}/create`, event, {
      headers: this.getAuthHeaders(),
      responseType: 'text'
    });
  }

  deleteEvent(id: number): Observable<string> {
    return this.http.delete(`${this.eventApiUrl}/${id}`, {
      headers: this.getAuthHeaders(),
      responseType: 'text' as const
    });
  }
}
