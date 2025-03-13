import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MediaService {
  private baseUrl = 'http://localhost:8080/api/media';

  constructor(private http: HttpClient) {}

  uploadMedia(file: File): Observable<any> {
    const formData = new FormData();
    formData.append('file', file);
    return this.http.post(`${this.baseUrl}/upload`, formData);
  }

  getMedia(): Observable<any> {
    return this.http.get(`${this.baseUrl}/all`);
  }
}
