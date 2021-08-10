import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { Router } from '@angular/router'
import { GeneralService } from '../../service/general-service.service'
import Swal from 'sweetalert2/dist/sweetalert2.js';

@Component({
  selector: 'app-view-channel',
  templateUrl: './view-channel.component.html',
  styleUrls: ['./view-channel.component.css']
})
export class ViewChannelComponent implements OnInit {
  ListImages: any [];
  usertype : number
  channel: boolean
  arrPosts: any[]
  channelID: any
  showAddPost: boolean

  nameChannel: any
  descriptionChanne: any
  postChannel: any
  showPosts: boolean

  post= {
    channel_id: 0,
    title: '',
    image_url: '',
    content: ''
  }

  addChannel = {
    user_id:this.generalService.user_id,
    name:'',
    description:''
  }

  @ViewChild('sidenav') sidenav: MatSidenav;
  isExpanded = true;
  showSubmenu: boolean = false;
  isShowing = false;
  showSubSubMenu: boolean = false;
  userId : number
  arrUser: any[]
  arrTags: any[]
  logged: boolean
  route: any


  color= {
    user_id: 0,
    name:'',
    color:'#000000',
  }

  constructor(private generalService : GeneralService, private router : Router) { }

  ngOnInit(): void {
    this.getChannel();
    this.getUserType();
    this.loggedIn();
  }

  getURL(url:string){
    this.post.image_url = url;
  }

  getImagesPixabay(word:string){
    this.generalService.getImagesPixabay(word)
    .subscribe(res=>{
      const json = JSON.stringify(res)
      const datajson = JSON.parse(json);
      this.ListImages = datajson.images;
      if(this.ListImages.length <= 0){
        Swal.fire({
          type: 'warning',
          icon: 'warning',
          title: 'Not Image Found',
          text: 'No images found on Pixabay'
        })
      }
    },
    err=>{
      console.log(err)
    })
  }

  newPost(){
    this.post.channel_id = this.generalService.user_channel
    if (!this.post.image_url) {
      this.post.image_url = "https://www.smartdatajob.com/images/joomlart/demo/default.jpg";
    }
    if (!this.post.title || !this.post.content) {
      Swal.fire({
        type: 'warning',
        icon: 'warning',
        title: 'Required Inputs',
        text: 'Title input and Content input are required'
      })
    }else{
      this.generalService.newPost(this.post)
      .subscribe(
        res=>{
          Swal.fire({
            icon: 'success',
            title: 'Your post has been posted!',
            showConfirmButton: true,
          })
          this.router.navigate(['home']).then(() => {
            window.location.reload();
          });
        },
        err=>{
          console.log(err)
        }
      )
    }
  }

  getChannel(){
    this.generalService.getUserChannel(this.generalService.user_id)
    .subscribe(res=>{
      if(res.Message=="No channels found"){
        this.channel = false;
        this.showAddPost = false
      }else{
        this.showAddPost = true
        this.channel = true;
        this.generalService.user_channel = res[0].channel_id
        this.postChannel = res[0].postquantity
        this.descriptionChanne = res[0].description
        this.nameChannel = res[0].name
        this.getPostChannel(res[0].channel_id)
      }
    },
    err=>{
      console.log(err)
    })
  }

  newChannel(){
    if(this.addChannel.description == '' || this.addChannel.name == ''){
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Pls fill all the fields!'
      })
    }else{
      this.generalService.newChannel(this.addChannel)
      .subscribe(res=>{
        Swal.fire({
          icon: 'success',
          title: 'Channel created successfully!',
          showConfirmButton: true,
        })
        this.router.navigate(['home']).then(() => {
          window.location.reload();
        });
      },
      err=>{
        console.log(err)
      })
    }
  }

  getPostChannel(id){
    this.generalService.getPostChannel(id)
    .subscribe(res=>{
      let data = JSON.stringify(res);
      let dataJson = JSON.parse(data); 
      if(dataJson.Message){
        this.showPosts = false
      }else{
        this.showPosts = true
        this.arrPosts = dataJson
      } 
    },
    err=>{
      console.log(err)
    })
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

  channelView(){
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
  redirectToTag(id){
    this.router.navigate(['/tags/',id]);
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
      },
      err=>{
        console.log(err)
      });
    },
    err=>{
      console.log(err)
    });
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
