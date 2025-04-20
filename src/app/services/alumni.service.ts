import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiEndpoints } from '../config/api.config';

export interface Alumni {
  id?: number;
  fullName: string;
  graduationYear: number;
  city: string;
  profession: string;
  email?: string;
  linkedin?: string;
  bio?: string;
  showEmail?: boolean;
}

export interface AlumniResponse {
  content: Alumni[];
  totalPages: number;
  totalElements: number;
  size: number;
  number: number;
}

@Injectable({ providedIn: 'root' })
export class AlumniService {

  private apiUrl = ApiEndpoints.alumni;

  constructor(private http: HttpClient) {}

  getAlumni(search: string, page: number, size: number): Observable<AlumniResponse> {
    let params = new HttpParams()
      .set('search', search || '')
      .set('page', page.toString())
      .set('size', size.toString());

    return this.http.get<AlumniResponse>(this.apiUrl, { params });
  }

  addAlumni(alumni: Alumni): Observable<Alumni> {
    return this.http.post<Alumni>(this.apiUrl, alumni);
  }
}
