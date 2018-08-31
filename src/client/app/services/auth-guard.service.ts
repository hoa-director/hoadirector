import { Injectable } from '@angular/core';
import { UserService } from './user.service';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {

  constructor(
    private userService: UserService, 
    private router: Router
  ) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    // TODO: Put this back in
    if (this.userService.isLoggedIn()) {
      console.log('user is logged in');
      return true;
    } else {
      this.router.navigate(['/login']);
      console.log('user is not logged in');
      return false;
    }
    // return true
  }
}
