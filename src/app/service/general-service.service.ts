import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class GeneralService {

  readonly URL = 'https://api-utagsgallery-codes.herokuapp.com';

  constructor(private http: HttpClient, private router : Router) { }

  signUp(user){
    return this.http.post<any>(this.URL + '/users', user);
  }
  signIn(User){
    return this.http.post<any>(this.URL+'/users/login',User)
  }
  newChannel(channel){
    return this.http.post<any>(this.URL+'/channels',channel)
  }
  loggedIn(){
    if (localStorage.getItem('token')) {
      return true
    }else{
      return false
    }
  }
  getToken(){
    return localStorage.getItem('token');
  }
  logout(){
    localStorage.removeItem('token');
    this.router.navigate(['/'])
  }
}
