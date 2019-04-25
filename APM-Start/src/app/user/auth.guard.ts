import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router, CanLoad, Route, UrlSegment } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate, CanLoad {
  canLoad(route: Route): boolean | Observable<boolean> | Promise<boolean> {
    return this.checkLoggedIn(route.path);
    throw new Error("Method not implemented.");
  }
  constructor(private authService: AuthService, private router: Router){

  }
  checkLoggedIn(url: string): boolean {
    if (this.authService.isLoggedIn){
      return true;
    }
    this.authService.redirectUrl =url;
    this.router.navigate(['/login']);
    return false;
  }
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
      return this.checkLoggedIn(state.url);
  }
}
