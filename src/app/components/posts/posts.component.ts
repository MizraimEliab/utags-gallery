import { Component, OnInit } from '@angular/core';
import { GeneralService } from '../../service/general-service.service'
import { Router } from '@angular/router'
import Swal from 'sweetalert2/dist/sweetalert2.js';  

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css']
})
export class PostsComponent implements OnInit {

  usertype : number
  userId : number
  userChannel: boolean
  arrUser: any[]
  arrPost: any[]
  arrTags: any[]

  arrComments: any[]
  body: any
  comments:any;
  comment:string;

  constructor(private generalService : GeneralService, private router: Router) { }

  ngOnInit(): void {
    this.getUser();
    this.getPosts();
    // this.getComments();
  }

  getUser(){
    this.generalService.getProfile()
    .subscribe(res =>{
      console.log(res);
      console.log('El id del user es : '+JSON.stringify(res));
      this.userId = res['user_id'];
      this.getAllTags()
      this.generalService.getUser(this.userId)
      .subscribe(res =>{
        console.log('los values del user: '+JSON.stringify(res));
        const json = JSON.stringify(res)
        const datajson = JSON.parse(json);
        this.arrUser = datajson
        this.generalService.user_id = this.arrUser[0].user_id
        this.generalService.user_type = this.arrUser[0].usertype     
        this.generalService.user_name = this.arrUser[0].name
        this.usertype = this.generalService.user_type 
        console.log(this.generalService.user_id);
        
        this.generalService.getChannel(this.userId)
        .subscribe(res=>{
          console.log("ChannelID: " + JSON.stringify(res))
        })  
      });
    });
  }
  getPosts(){
    this.generalService.getPosts()
    .subscribe(res=>{
      const json = JSON.stringify(res)
      const datajson = JSON.parse(json);
      this.arrPost = datajson
      console.log('**********');
      console.log(this.arrPost);
      
      
    })
  }
  likePost(id){
    this.generalService.postLiked(id)
    .subscribe(res=>{
      console.log(res)
      this.getPosts()
    })
  }

  getAllTags(){
    // console.log(this.userId)
    this.generalService.getTagsUser(this.userId)
      .subscribe(
        res=>{
          const json = JSON.stringify(res)
          const datajson = JSON.parse(json);
          this.arrTags = datajson
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

  Comment(post_id:number){
    this.comments = {
      user_id: this.generalService.user_id,
      post_id: post_id,
      comment: this.comment
    }
    this.generalService.postComment(this.comments)
    .subscribe(res=>{
    });
  }


  getComments(post_id){
    this.generalService.getCommetsByPost(post_id)
    .subscribe(res=>{
      const json = JSON.stringify(res)
      const datajson = JSON.parse(json);
      this.arrComments = datajson
    })
  }

  redirectToComment(id){
    // this.generalService.post_id = id;
    // console.log(this.generalService.post_id)
    this.router.navigate(['/comments/',id]);
  }

}
