import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, map, tap } from 'rxjs';

type LoginResponse = {
  token: string;
  expiresIn: string | number;
  user: { _id: string; name: string; email: string };
};

const TOKEN_KEY = 'travlr_admin_token';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly apiBase = '/api/auth';
  private readonly loggedInSubject = new BehaviorSubject<boolean>(!!this.getToken());

  readonly isLoggedIn$: Observable<boolean> = this.loggedInSubject.asObservable();

  constructor(private http: HttpClient) {}

  getToken(): string | null {
    return localStorage.getItem(TOKEN_KEY);
  }

  isLoggedIn(): boolean {
    return !!this.getToken();
  }

  login(email: string, password: string): Observable<LoginResponse> {
    return this.http
      .post<LoginResponse>(`${this.apiBase}/login`, { email, password })
      .pipe(
        tap((res) => {
          localStorage.setItem(TOKEN_KEY, res.token);
          this.loggedInSubject.next(true);
        })
      );
  }

  logout(): void {
    localStorage.removeItem(TOKEN_KEY);
    this.loggedInSubject.next(false);
  }

  // Small helper for templates
  getLoggedIn$(): Observable<boolean> {
    return this.isLoggedIn$.pipe(map(Boolean));
  }
}

