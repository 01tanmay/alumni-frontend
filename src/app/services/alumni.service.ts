import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AlumniService {
  private apiUrl = 'http://localhost:8080/api/alumni'; // Change this to match your backend URL

  constructor(private http: HttpClient) {}

  /** Register an Alumni */
  registerAlumni(formData: FormData): Observable<any> {
    return this.http.post(`${this.apiUrl}/register`, formData);
  }

  /** Validate Marksheet */
  validateMarksheet(file: File): Observable<any> {
    const formData = new FormData();
    formData.append('marksheet', file);
    return this.http.post(`${this.apiUrl}/validate-marksheet`, formData);
  }
}
