import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import * as CryptoJS from 'crypto-js';
import { BehaviorSubject, EMPTY, Observable, map, switchMap, tap } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { User } from '../../../core/models/User.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly SESSION_KEY = 'user_session';
  private readonly apiUrl = environment.api;

  private errorLoginSubject = new BehaviorSubject<boolean>(false);

  constructor(private http: HttpClient, private router: Router) {}

  get errorLogin$(): Observable<boolean> {
    return this.errorLoginSubject.asObservable();
  }

  getUserByEmail(email: string): Observable<User[]> {
    return this.http
      .get(`${this.apiUrl}/users?email=${email}`)
      .pipe(map((response: any) => response));
  }

  login(email: string, password: string) {
    this.getUserByEmail(email).subscribe((response) => {
      if (response.length > 0) {
        const user: User = response[0];
        const decryptedPassword = CryptoJS.AES.decrypt(
          user.password,
          'secret_key'
        ).toString(CryptoJS.enc.Utf8);
        if (decryptedPassword === password) {
          localStorage.setItem(this.SESSION_KEY, JSON.stringify(user));
          this.router.navigate(['/']);
        } else {
          this.errorLoginSubject.next(true);
        }
      } else {
        this.errorLoginSubject.next(true);
      }
    });
  }

  registerUser(user: User): Observable<any> {
    return this.getUserByEmail(user.email).pipe(
      switchMap((response) => {
        if (response.length > 0) {
          this.errorLoginSubject.next(true);
          return EMPTY;
        } else {
          const encryptedPassword = CryptoJS.AES.encrypt(
            user.password,
            'secret_key'
          ).toString();
          const newUser = { ...user, password: encryptedPassword };
          return this.http.post(`${this.apiUrl}/users`, newUser).pipe(
            tap(() => {
              this.router.navigate(['/auth/login']);
              this.errorLoginSubject.next(false);
            })
          );
        }
      })
    );
  }

  logout(): void {
    localStorage.removeItem(this.SESSION_KEY);
  }

  isAuthenticated(): boolean {
    return !!localStorage.getItem(this.SESSION_KEY);
  }

  getRole(): string {
    const userString = localStorage.getItem(this.SESSION_KEY);
    if (userString !== null) {
      const user = JSON.parse(userString);
      return user.role;
    } else {
      return '';
    }
  }

  isAdmin(): boolean {
    return this.getRole() === 'ADMIN';
  }

  resetErrorSession(): void {
    this.errorLoginSubject.next(false);
  }

  getUser(): User {
    const userString = localStorage.getItem(this.SESSION_KEY);
    return userString ? JSON.parse(userString) : null;
  }
}
