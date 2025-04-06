import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiEndpoints } from '../config/api.config';

@Injectable({ providedIn: 'root' })
export class AlumniService {
  private apiUrl = ApiEndpoints.alumni;

  constructor(private http: HttpClient) {}

  registerAlumni(formData: FormData): Observable<any> {
    return this.http.post(`${this.apiUrl}/register`, formData);
  }

  validateMarksheet(file: File): Observable<any> {
    const formData = new FormData();
    formData.append('marksheet', file);
    return this.http.post(`${this.apiUrl}/validate-marksheet`, formData);
  }
}
