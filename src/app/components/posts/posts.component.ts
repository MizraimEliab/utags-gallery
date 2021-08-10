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

  showPosts: boolean

  constructor(private generalService : GeneralService, private router: Router) { }

  ngOnInit(): void {
    this.getUser();
    this.getPosts();
  }

  getUser(){
    this.generalService.getProfile()
    .subscribe(res =>{
      this.userId = res['user_id'];
      this.getAllTags()
      this.generalService.getUser(this.userId)
      .subscribe(res =>{
        const json = JSON.stringify(res)
        const datajson = JSON.parse(json);
        this.arrUser = datajson
        this.generalService.user_id = this.arrUser[0].user_id
        this.generalService.user_type = this.arrUser[0].usertype
        this.generalService.user_name = this.arrUser[0].name
        this.usertype = this.generalService.user_type
      });
    });
  }

  getPosts(){
    this.generalService.getPosts()
    .subscribe(res=>{
      if(res.Message == "No posts found"){
        this.showPosts = false
        this.arrPost = []
      }else{
        this.showPosts = true
        const json = JSON.stringify(res)
        const datajson = JSON.parse(json);
        this.arrPost = datajson
      }
    },
    err=>{
      console.log(err)
    })
  }

  addFav(id){
    let fav = {
      user_id:this.generalService.user_id,
      post_id:id
    }
    this.generalService.addFav(fav)
    .subscribe(res=>{
      Swal.fire({
        icon: 'success',
        title: 'Post added successfully!'
      })
    },
    err=>{
      console.log(err)
    })
  }


  likePost(id){
    this.generalService.postLiked(id)
    .subscribe(res=>{
      const post = this.arrPost.filter((x) => {
        if (x.post_id === id) {
          x.likes = x.likes + 1;
        };
      })
    },
    err=>{
      console.log(err)
    })
  }


  getAllTags(){
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
        }
      )
  }

  redirectToComment(id){
    this.router.navigate(['/comments/',id]);
  }

}
