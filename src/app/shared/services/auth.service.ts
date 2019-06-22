import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';
import { map } from 'rxjs/operators';
import { ReplaySubject, Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  loggedinStream: ReplaySubject<any> = new ReplaySubject();
  authed: boolean;
  apiUrl = environment.apiUrl;

  loggedin$(): Observable<any> {
    return this.loggedinStream.asObservable();
  }

  constructor(private router: Router, private http: HttpClient,
    private cookieService: CookieService) {
  }

  login(credentials) {
    const url = this.apiUrl + '/api/auth/login';
    return this.http.post<any>(url, {credentials}, {withCredentials: true})
    .pipe(
      map(result => {
        if (result.auth) {
          this.cookieService.set('access_token', result.token);
          this.loggedinStream.next(true);
          return result;
        } else {
          return result;
        }
      })
    );
  }

  get loggedIn() {
    return (this.cookieService.get('access_token') !== 'null' &&
      this.cookieService.get('access_token') !== '');
  }

  registerUser(user) {
    const url = this.apiUrl + '/api/auth/register-user';
    return this.http.post<any>(url, {user: user})
      .pipe(
        map(result => {
          if (!result.error) {
            this.cookieService.set('access_token', result.token);
            return result;
          }
          return result;
        })
      );
  }
  getAuthToken() {
    return this.cookieService.get('access_token');
  }
  logout() {
    const url = this.apiUrl + '/api/auth/logout';
    this.loggedinStream.next(false);
    this.cookieService.set('access_token', null);
    this.http.post(url, {}, {withCredentials: true})
      .subscribe(res => {
        this.router.navigate(['/login']);
      });
  }
}
