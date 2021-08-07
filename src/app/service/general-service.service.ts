import { Injectable, Pipe, PipeTransform } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';

@Injectable({
  providedIn: 'root'
})

export class GeneralService {
  user_id : number
  user_type : number
  user_name: string
  user_channel: any
  mytrustedUrl;


  readonly URL = 'https://api-utagsgallery-codes.herokuapp.com';  


  constructor(private http: HttpClient, private router : Router, private sanitizer: DomSanitizer) { 
   // this.sanitizer 
    this.mytrustedUrl = this.sanitizer.bypassSecurityTrustUrl(this.URL);

  }

  signUp(user){
    return this.http.post<any>(this.mytrustedUrl.changingThisBreaksApplicationSecurity + '/users', user);
  }
  signIn(User){
    return this.http.post<any>(this.mytrustedUrl.changingThisBreaksApplicationSecurity+'/users/login',User)
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
    return this.http.get<any>(this.mytrustedUrl.changingThisBreaksApplicationSecurity+'/users/'+`${id}`)
  }
  newChannel(channel){
    return this.http.post<any>(this.mytrustedUrl.changingThisBreaksApplicationSecurity+'/channels',channel)
  }
  getChannel(id){
    return this.http.get<any>(this.mytrustedUrl.changingThisBreaksApplicationSecurity+'/channels/'+`${id}`)
  }
  getProfile(){
    return this.http.get<any>(this.mytrustedUrl.changingThisBreaksApplicationSecurity+'/users/profile')
  }
  getPosts(){
    return this.http.get<any>(this.mytrustedUrl.changingThisBreaksApplicationSecurity+'/posts')
  }
  newPost(newpost){
    return this.http.post<any>(this.mytrustedUrl.changingThisBreaksApplicationSecurity+'/posts',newpost)
  }
  postLiked(idPost){
    return this.http.put<any>(this.mytrustedUrl.changingThisBreaksApplicationSecurity+'/posts/like/'+`${idPost}`,'')
  }
  addTag(tag){
    return this.http.post<any>(this.mytrustedUrl.changingThisBreaksApplicationSecurity+'/tags',tag);
  }
  getTagsUser(id){
    return this.http.get<any>(this.mytrustedUrl.changingThisBreaksApplicationSecurity+'/tags/all/'+`${id}`)
  }
}
