import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiEndpoints } from '../config/api.config';

@Injectable({ providedIn: 'root' })
export class MediaService {
  private apiUrl = ApiEndpoints.media;

  constructor(private http: HttpClient) {}

  uploadMedia(file: File): Observable<any> {
    const formData = new FormData();
    formData.append('file', file);
    return this.http.post(`${this.apiUrl}/upload`, formData);
  }

  getMedia(): Observable<any> {
    return this.http.get(`${this.apiUrl}/all`);
  }
}
