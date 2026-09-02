import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { environment } from '../environments/environment';
import { catchError, map, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private http = inject(HttpClient);
  private apiUrl = environment.apiUrl;

  isLoggedIn = signal<boolean>(localStorage.getItem('isLoggedIn') === 'true');

  login(password: string) {
    return this.http
      .post<{ success: boolean }>(`${this.apiUrl}/Auth/login`, {
        password,
      })
      .pipe(
        map(() => {
          localStorage.setItem('isLoggedIn', 'true');
          this.isLoggedIn.set(true);
          return true;
        }),
        catchError(() => of(false)),
      );
  }

  logout() {
    sessionStorage.removeItem('isLoggedIn');
    this.isLoggedIn.set(false);
  }
}
