import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot,   CanActivate,  Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(
    private _router:Router,

  ){

  }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      const loggenIn = localStorage.getItem('accessToken') ? true: false;
      if(!loggenIn){

        this._router.navigate(['login'])
      }
      return loggenIn ;
  }

}
