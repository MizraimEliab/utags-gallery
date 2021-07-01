import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class GeneralService {
  user_id : number
  user_type : number
  user_name: string
  user_channel: any

  readonly URL = 'https://api-utagsgallery-codes.herokuapp.com';

  constructor(private http: HttpClient, private router : Router) { }

  signUp(user){
    return this.http.post<any>(this.URL + '/users', user);
  }
  signIn(User){
    return this.http.post<any>(this.URL+'/users/login',User)
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
  getUser(id){
    return this.http.get<any>(this.URL+'/users/'+`${id}`)
  }
  newChannel(channel){
    return this.http.post<any>(this.URL+'/channels',channel)
  }
  getChannel(id){
    return this.http.get<any>(this.URL+'/channels/'+`${id}`)
  }
  getProfile(){
    return this.http.get<any>(this.URL+'/users/profile')
  }
  getPosts(){
    return this.http.get<any>(this.URL+'/posts')
  }
  newPost(newpost){
    return this.http.post<any>(this.URL+'/posts',newpost)
  }
  postLiked(idPost){
    return this.http.put<any>(this.URL+'/posts/like/'+`${idPost}`,'')
  }
}
