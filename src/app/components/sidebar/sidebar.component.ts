import { Component, OnInit, ViewChild, ChangeDetectorRef } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { GeneralService } from '../../service/general-service.service'
import { Router } from '@angular/router'
import Swal from 'sweetalert2/dist/sweetalert2.js';  

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  @ViewChild('sidenav') sidenav: MatSidenav;
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


  constructor(private generalService : GeneralService, private router: Router) { }


  ngOnInit(): void {
    this.getUserType();
    this.loggedIn();
    this.route = this.router.url
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
