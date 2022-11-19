import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, ActivationEnd, CanActivate, NavigationEnd, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginGuard implements CanActivate {
  constructor(
    private _router:Router,

  ){

  }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      const loggenIn = localStorage.getItem('accessToken') ? true: false;
      if(loggenIn){

        this._router.navigate([''])
      }


      return !loggenIn ;
  }

}
