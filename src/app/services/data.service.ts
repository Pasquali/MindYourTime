import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  apiUrl = 'http://localhost:3100';
  constructor(private http: HttpClient) { }

  uploadTime(user_id, time, breaths) {
    const url = this.apiUrl + '/api/timer/upload-time';
    return this.http.post(url, {user_id: user_id, time: time, breaths: breaths});
  }
}
