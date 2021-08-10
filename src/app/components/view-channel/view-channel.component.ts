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

  nameChannel: any
  descriptionChanne: any
  postChannel: any

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
  item = '#FF0000'

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
    console.log(url);
    this.post.image_url = url;
    console.log(this.post);
  }





  getImagesPixabay(word:string){

    this.generalService.getImagesPixabay(word)
    .subscribe(res=>{
      console.log('*******************');
      const json = JSON.stringify(res)
      const datajson = JSON.parse(json);
      //console.log(datajson.images);
      this.ListImages = datajson.images;
      console.log(this.ListImages);

    })
  }

  newPost(){
    console.log("****************************************************")
    this.post.channel_id = this.generalService.user_channel
    console.log(this.post)
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
          console.log(res)
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
      console.log(res)
      if(res.Message=="No channels found"){
        this.channel = false;
        console.log("No hay")
      }else{
        console.log("*************************")
        console.log(res)
        this.channel = true;
        this.generalService.user_channel = res[0].channel_id
        this.postChannel = res[0].postquantity
        this.descriptionChanne = res[0].description
        this.nameChannel = res[0].name
        this.getPostChannel(res[0].channel_id)
      }
    })
  }

  newChannel(){
    this.generalService.newChannel(this.addChannel)
    .subscribe(res=>{
      console.log(res)
    })
  }

  getPostChannel(id){
    this.generalService.getPostChannel(id)
    .subscribe(res=>{
      console.log("*****  Ayuda ******")
      let data = JSON.stringify(res);
      let dataJson = JSON.parse(data);  
      this.arrPosts = dataJson
      console.log(this.arrPosts)
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
    console.log("Logged: " + this.logged)
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
      });
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
          console.log(res);
          let data = JSON.stringify(res);
          console.log("Data Tag" + data);
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
    // console.log(this.userId)
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
