import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { GeneralService } from '../../service/general-service.service'
import { Router } from '@angular/router'
import * as RecordRTC from 'recordrtc';
import Swal from 'sweetalert2/dist/sweetalert2.js';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  title = 'micRecorder';

  //Lets declare Record OBJ
  record;
  //Will use this flag for toggeling recording
  recording = false;
  //URL of Blob
  url;
  error;
  
  @ViewChild('sidenav') sidenav: MatSidenav;
  usertype : number
  userId : number
  userChannel: boolean
  arrUser: any[]
  isExpanded = true;
  showSubmenu: boolean = false;
  isShowing = false;
  showSubSubMenu: boolean = false;
  arrTags: any[]
  logged: boolean
  route: any
  item = '#FF0000'

  color= {
    user_id: 0,
    name:'',
    color:'#000000',
  }

  constructor(private generalService : GeneralService, private router: Router ,private domSanitizer: DomSanitizer) { }
  sanitize(url: string) {
    return this.domSanitizer.bypassSecurityTrustUrl(url);
  }

  // audio
  initiateRecording() {

    this.recording = true;
    let mediaConstraints = {
      video: false,
      audio: true
    };
    navigator.mediaDevices
      .getUserMedia(mediaConstraints)
      .then(this.successCallback.bind(this), this.errorCallback.bind(this));
  }
  successCallback(stream) {
    var options = {
      mimeType: "audio/wav",
      numberOfAudioChannels: 1,
      sampleRate: 58000,
    };
    //Start Actuall Recording
    var StereoAudioRecorder = RecordRTC.StereoAudioRecorder;
    this.record = new StereoAudioRecorder(stream, options);
    this.record.record();
  }

  stopRecording() {
    this.recording = false;
    this.record.stop(this.processRecording.bind(this));
  }

  /**
   * processRecording Do what ever you want with blob
   * @param  {any} blob Blog
   */

  processRecording(blob) {
    this.url = URL.createObjectURL(blob);
    console.log("blob", blob);
    console.log("url", this.url);
  }

  errorCallback(error) {
    this.error = 'Can not play audio in your browser';
  }
  
  // termina audio
  ngOnInit(): void {
    this.getUser();
    this.getUserType();
    this.loggedIn();
  }

  getUser(){
    this.generalService.getProfile()
    .subscribe(res =>{
      this.userId = res['user_id'];
      this.generalService.getUser(this.userId)
      .subscribe(res =>{
        this.arrUser = res
        this.usertype = this.generalService.user_type  
      });
    });
  }

  getUserType(){
    this.generalService.getProfile()
    .subscribe(res =>{
      this.userId = res['user_id'];
      this.getAllTags();
      this.generalService.getUser(this.userId)
      .subscribe(res =>{
        this.arrUser = res
        this.usertype = this.arrUser[0].usertype
      });
    });
  }

  mouseenter() {
    if (!this.isExpanded) {
      this.isShowing = true;
    }
  }

  mouseleave() {
    if (!this.isExpanded) {
      this.isShowing = false;
    }
  }

  redirectToTag(id){
    this.router.navigate(['/tags/',id]);
  }

  channel(){
    this.router.navigate(['/viewChannel']);
  }

  profile(){
    this.router.navigate(['/profile']);
  }

  home(){
    this.router.navigate(['/home']);
  }

  fav(){
    this.router.navigate(['/favorites'])
  }

  loggedIn(){
    this.logged = this.generalService.loggedIn()
  }
  logOut(){
    this.generalService.logout();
  }

  addTag(){
    if(this.color.name == '' || this.color.color == '' || this.userId == 0){
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Pls fill all the fields!'
      })
      this.color.name = '';
    }else{
      this.color.user_id = this.userId;
      this.generalService.addTag(this.color)
      .subscribe(
        res=>{
          let data = JSON.stringify(res);
          Swal.fire({
            icon: 'success',
            title: 'Your tag has been saved!',
            showConfirmButton: true,
          }).then((result) => {
            window.location.reload();
          })
        },
        err=>{
          console.log(err)
        }
      )
   }
  }

  getAllTags(){
    this.generalService.getTagsUser(this.userId)
      .subscribe(
        res=>{
          this.arrTags = res
        },
        err=>{
          console.log(err)
        }
      )
  }
}
