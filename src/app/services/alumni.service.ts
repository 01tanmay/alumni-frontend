import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'; // ✅ FIX
import { Observable } from 'rxjs'; // ✅ FIX
import { ApiEndpoints } from '../config/api.config';

@Injectable({ providedIn: 'root' })
export class AlumniService {
  private apiUrl = ApiEndpoints.alumni;

  constructor(private http: HttpClient) {}

  registerAlumni(formData: FormData): Observable<any> {
    return this.http.post(`${this.apiUrl}/register`, formData, {
      responseType: 'text' as 'json'
    });
  }

  validateMarksheet(file: File, passoutYear: number, seatNumber: string): Observable<any> {
    const formData = new FormData();
    formData.append('marksheet', file);
    formData.append('year', passoutYear.toString());
    formData.append('seatNumber', seatNumber);

    return this.http.post(`${this.apiUrl}/validate-marksheet`, formData, {
      responseType: 'text' as 'json'
    });
  }

  validatePayment(utr: string, year: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/validatePayment/${utr}/${year}`, { responseType: 'text' });
  }
}
