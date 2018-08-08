import { Router, RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router';
import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { CookieService } from '../../../node_modules/ngx-cookie-service';
// import { Observable } from '../../../node_modules/rxjs';

@Injectable()
export class AuthGuard {
  authenticated;
  constructor(public authService: AuthService, private router: Router,
    private cookieService: CookieService) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<boolean> | boolean {
    this.authenticated = this.authService.loggedIn;
    if (this.authenticated === 'true' || this.authenticated === true) {
      this.authService.loggedinStream.next(true);
      return true;
    } else {
      this.authService.loggedinStream.next(false);
      this.router.navigate(['/login']);
      return false;
    }
  }
}
