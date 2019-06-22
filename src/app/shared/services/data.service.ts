import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthService } from './auth.service';
import { environment } from '../../../environments/environment';
import { Response } from '@angular/http';
import { map } from 'rxjs/operators';
import { Stats } from '../models/stats.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  apiUrl = environment.apiUrl;

  constructor(private http: HttpClient, private auth: AuthService) { }

  uploadTime(time, breaths, id = null) {
    const url = this.apiUrl + '/api/timer/upload-time';
    return this.http.post<any>(url, {time: time, breaths: breaths, id: id}, {withCredentials: true});
  }
  getTotalValues(): Observable<Stats> {
    const url = this.apiUrl + '/api/timer/total-time';
    return this.http.get<Stats>(url, {withCredentials: true});
  }
}
