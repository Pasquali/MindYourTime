import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  // loginErrorStream: ReplaySubject<any> = new ReplaySubject();
  // loginStream: ReplaySubject<any> = new ReplaySubject();
  authState: any = null;

  // login$(): Observable<any> {
  //   return this.loginStream.asObservable();
  // }
  // loginError$(): Observable<any> {
  //   return this.loginErrorStream.asObservable();
  // }

  constructor(private router: Router, private http: HttpClient) {
  }

  login(credentials) {
    console.log(credentials);
    // return this.http.post();
  }
}
