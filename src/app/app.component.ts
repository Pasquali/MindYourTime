import { Component } from '@angular/core';
import { AuthService } from './shared/services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  authed;
  constructor(private auth: AuthService) {
    this.auth.loggedin$()
      .subscribe(res => {
        this.authed = res;
      });
  }

  logout() {
    this.auth.logout();
  }
}
