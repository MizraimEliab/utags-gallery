import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { GeneralService } from '../../service/general-service.service';
import { Router } from '@angular/router'
import { ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2/dist/sweetalert2.js';

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.css']
})
export class CommentsComponent implements OnInit {
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

  arrPost: any[]
  ID: string
  body: any
  arrComments: any[]
  comment: string

  constructor(private generalService: GeneralService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.catchID()
    this.getComments()
    this.getAllTags()
    this.getUserType();
    this.loggedIn();
  }

  catchID(){
    // this.route.params.subscribe((params: Params) => this.myParam = params['id']);
    this.ID = this.route.snapshot.params.id
    console.log("...................");
    console.log(this.ID)
  }

  getComments(){
    // console.log(this.ID)
    this.generalService.getPostByID(this.ID)
    .subscribe(res=>{
      const json = JSON.stringify(res)
      const datajson = JSON.parse(json);
      this.arrPost = datajson.data
      // this.arrPost = res.data
      console.log(this.arrPost)
      this.generalService.getCommetsByPost(this.ID)
      .subscribe(res=>{
        console.log('*************')
        const json = JSON.stringify(res)
        const datajson = JSON.parse(json);
        this.arrComments = datajson
        console.log(this.arrComments)
      })
    })

    // this.generalService.getCommetsByPost(this.generalService.post_id)
    // .subscribe(res=>{
    //   console.log(res)
    //   this.arrComments = res;
    // })
  }
  redirectToTag(id){
    this.router.navigate(['/tags/',id]);
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
  

  addTagToPost(tag_id, post_id){
    this.body = {
      tag_id: tag_id,
      post_id : post_id
    }
    console.log(this.body);

    this.generalService.addTagToPost(this.body)
      .subscribe(
        res=>{
          console.log(res);
          Swal.fire({
            icon: 'success',
            title: 'Post added successfully!'
          })
        },
        err=>{
          console.log(err)
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Error!'
          })
        }
      )
  }

  Comment(id){
    let comments = {
      user_id: this.generalService.user_id,
      post_id: id,
      comment: this.comment
    }
    if (!comments.comment) {
      Swal.fire({
        type: 'warning',
        icon: 'warning',
        title: 'Required Input',
        text: 'Comment input is required'
      })
    }else{
      this.generalService.postComment(comments)
      .subscribe(res=>{
        console.log(res)
        this.getComments()
        this.comment = ""
      })
    }



  }

  home(){
    this.router.navigate(['/home']);
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

}
