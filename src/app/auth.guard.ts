import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { Router } from '@angular/router';
import { GeneralService } from './service/general-service.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private generalService: GeneralService, private router : Router){}
  canActivate(): boolean{
    if (this.generalService.loggedIn()) {
      return true

    }this.router.navigate(['/signin']);

    return false

  }



}