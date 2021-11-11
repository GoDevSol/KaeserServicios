import { Injectable } from '@angular/core';
import { CanActivate,Router,  Route, UrlSegment, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Storage } from '@ionic/storage';

@Injectable({
  providedIn: 'root'
})
export class IntroGuard implements CanActivate {
  constructor(private storage: Storage,private router: Router){

  }
  
  async canActivate(){
    //route: ActivatedRouteSnapshot,
    //state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      var IsLogged;  
    try {
        IsLogged = await this.storage.get('isLogged');          
      } catch (error) {             
        IsLogged = false;
      }
      
      if (IsLogged){
        return true;
      }else{
        this.router.navigateByUrl("/login");
      }     
  }  

}
