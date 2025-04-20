import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiEndpoints } from '../config/api.config';

@Injectable({ providedIn: 'root' })
export class RegisterService {
  private apiUrl = ApiEndpoints.register;

  constructor(private http: HttpClient) {}

  registerAlumni(formData: FormData): Observable<any> {
    return this.http.post(`${this.apiUrl}/register`, formData, {
      responseType: 'text' as 'json'
    });
  }
}
