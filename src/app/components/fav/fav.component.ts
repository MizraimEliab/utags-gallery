import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { GeneralService } from '../../service/general-service.service';
import { Router } from '@angular/router'
import Swal from 'sweetalert2/dist/sweetalert2.js'; 

@Component({
  selector: 'app-fav',
  templateUrl: './fav.component.html',
  styleUrls: ['./fav.component.css']
})
export class FavComponent implements OnInit {
  @ViewChild('sidenav') sidenav: MatSidenav;
  arrFav: any[]
  isExpanded = true;
  showSubmenu: boolean = false;
  isShowing = false;
  showSubSubMenu: boolean = false;
  userId : number
  arrUser: any[]
  arrTags: any[]
  usertype : number
  logged: boolean
  route: any
  item = '#FF0000'

  color= {
    user_id: 0,
    name:'',
    color:'#000000',
  }

  constructor(private generalService: GeneralService,private router: Router) { }

  ngOnInit(): void {
    this.getPosts()
    this.getUserType();
    this.loggedIn();
  }


  getPosts(){
    // console.log(this.generalService.user_id)
    this.generalService.getFavPost(this.generalService.user_id)
    .subscribe(res=>{
      console.log("*************")
      this.arrFav = res
      console.log(res)
    })
  }

  removePost(id){
    this.generalService.deleteFavPost(id)
    .subscribe(res=>{
      console.log(res)
      this.getPosts()
    })
  }

  viewComplete(id){
    this.router.navigate(['/comments/',id]);
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
    console.log("Logged: " + this.logged)
  }
  logOut(){
    this.generalService.logout();
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
            title: 'Your tag has been saved',
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