import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { ActivatedRoute, Router } from '@angular/router';
import { GeneralService } from 'src/app/service/general-service.service';
import Swal from 'sweetalert2/dist/sweetalert2.js';


@Component({
  selector: 'app-tags',
  templateUrl: './tags.component.html',
  styleUrls: ['./tags.component.css']
})
export class TagsComponent implements OnInit {
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
  item = '#FF0000'

  color= {
    user_id: 0,
    name:'',
    color:'#000000',
  }

  tagID: any[]
  tagName: any

  constructor(private generalService : GeneralService, private router: Router ,private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.getUserType();
    this.getAllTags()
    this.getTagID()
    this.getPosts()
    this.getTagData()
    this.loggedIn();
  }

  getTagID(){
    this.tagID = this.route.snapshot.params.id
  }

  getTagData(){
    this.generalService.getTag(this.tagID)
    .subscribe(res=>{
      console.log("///////////////")
      this.tagName = res[0].name
      console.log(this.tagName)
    })
  }


  getPosts(){
    console.log('mi pichula identifica');
    
    console.log(this.tagID)
    this.generalService.getTagsPost(this.tagID)
    .subscribe(res=>{
      console.log("*************")
      this.arrTags = res
      console.log(res)
      // if(res.code == "404"){
      //   Swal.fire({
      //     icon: 'warning',
      //     title: 'Oops...',
      //     text: 'You dont have any post tagged!'
      //   }).then((result) => {
      //     window.location.href = "/home";
      //   })
      // }
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

  redirectToTag(id){
    this.router.navigate(['/tags/',id]);
  }

  getAllTags(){
    // console.log('a mi pichulaaaaaaaaaaaaaaa');
    
    // console.log(this.generalService.user_id)
    this.generalService.getTagsUser(this.generalService.user_id)
      .subscribe(
        res=>{
          this.arrTags = res
          console.log('*****aaaaaa mi pichulaaaaaaaaaa*****');
          console.log(res);
          
          
        },
        err=>{
          console.log(err)
        }
      )
  }

  getUserType(){
    this.generalService.getProfile()
    .subscribe(res =>{
      this.userId = res['user_id'];
      // this.getAllTags();
      this.generalService.getUser(this.userId)
      .subscribe(res =>{
        this.arrUser = res
        this.usertype = this.arrUser[0].usertype
      });
    });
  }
}
