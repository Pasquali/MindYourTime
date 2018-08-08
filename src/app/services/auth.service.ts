import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';
import { map } from 'rxjs/operators';
import { ReplaySubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  // loginErrorStream: ReplaySubject<any> = new ReplaySubject();
  loggedinStream: ReplaySubject<any> = new ReplaySubject();
  authState: any = null;
  apiUrl = 'http://localhost:3100';


  loggedin$(): Observable<any> {
    return this.loggedinStream.asObservable();
  }
  // loginError$(): Observable<any> {
  //   return this.loginErrorStream.asObservable();
  // }

  constructor(private router: Router, private http: HttpClient,
    private cookieService: CookieService) {
  }

  login(credentials) {
    const url = this.apiUrl + '/api/auth/login';
    return this.http.post<any>(url, {credentials})
    .pipe(
      map(result => {
        this.cookieService.set('access_token', result.token);
        this.loggedinStream.next(true);
        return result;
      })
    );
  }
  get loggedIn(): boolean {
    return (this.cookieService.get('access_token') !== 'null');
  }
  registerUser(user) {
    const url = this.apiUrl + '/api/auth/register-user';
    return this.http.post<any>(url, {user: user})
      .pipe(
        map(result => {
          this.cookieService.set('access_token', result.token);
          return result;
        })
      );
  }
  test() {
    const url = this.apiUrl + '/api/auth/me';
    return this.http.get(url, {withCredentials: true});
  }
  logout() {
    this.loggedinStream.next(false);
    this.cookieService.set('access_token', null);
  }
}
