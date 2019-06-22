import { Component } from '@angular/core';
import { AuthService } from './shared/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  authed;
  constructor(private auth: AuthService, private router: Router) {
    this.auth.loggedin$()
      .subscribe(res => {
        this.authed = res;
      });
  }

  logout() {
    this.router.navigate(['/login']);
    this.auth.logout();
  }
}
