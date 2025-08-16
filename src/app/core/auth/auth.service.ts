import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { API_BASE_URL } from '../config/config';
import { LoginDto, LoginApiResponse, SignupDto } from './auth.types';
import { Observable, of } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AuthApiService {
  private http = inject(HttpClient);
  private apiBase = inject(API_BASE_URL);

  login(dto: LoginDto) {
    return this.http.post<LoginApiResponse>(`${this.apiBase}/auth/login`, dto)
      .pipe(map(res => res.data));
  }

  signup(dto: SignupDto) {
    return this.http.post(`${this.apiBase}/auth/signup`, dto);
  }

  logout() {
    return this.http.post(`${this.apiBase}/auth/logout`, {});
  }

  check(): Observable<boolean> {
    try {
      const raw = localStorage.getItem('token');
      if (!raw) return of(false);
      return of(true);
    } catch {
      return of(false);
    }
  }
}
