import { Injectable } from '@angular/core';
import { HttpInterceptor } from '@angular/common/http';
import {GeneralService} from '../service/general-service.service';
import { from } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class TokenInterceptorService implements HttpInterceptor {


  constructor(private generalService: GeneralService) { }

  intercept(req, next ){
    const tokeized = req.clone({
      setHeaders: {
        Authorization: `Bearer ${this.generalService.getToken()}`
      }
    })
    return next.handle(tokeized);
  }
}