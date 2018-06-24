import { Router, RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router';
import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
// import { Observable } from '../../../node_modules/rxjs';

@Injectable()
export class AuthGuard {
  authenticated;
  constructor(public authService: AuthService, private router: Router) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot ): Promise<boolean> | boolean {
    // this.authenticated = this.authService.authenticated;
    if (this.authenticated === 'true' || this.authenticated === true) {
      return true;
    } else {
      this.router.navigate(['/login']);
      return false;
    }
  }
}
