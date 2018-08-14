import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  apiUrl = 'http://localhost:3100';
  constructor(private http: HttpClient, private auth: AuthService) { }

  uploadTime(time, breaths) {
    const headers: HttpHeaders = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    const token = this.auth.getAuthToken();
    const url = this.apiUrl + '/api/timer/upload-time';
    return this.http.post(url, {time: time, breaths: breaths}, {headers: headers, withCredentials: true});
  }
  getTotalTime() {
    const url = this.apiUrl + '/api/timer/total-time';
    return this.http.get(url, {withCredentials: true});
  }
}
