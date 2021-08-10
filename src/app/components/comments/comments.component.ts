import { Component, OnInit } from '@angular/core';
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

  arrPost: any[]
  ID: string
  arrTags: any[]
  body: any
  arrComments: any[]
  comment: string

  constructor(private generalService: GeneralService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.catchID()
    this.getComments()
    this.getAllTags()
  }

  catchID(){
    // this.route.params.subscribe((params: Params) => this.myParam = params['id']);
    this.ID = this.route.snapshot.params.id
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

  getAllTags(){
    // console.log(this.userId)
    this.generalService.getTagsUser(this.generalService.user_id)
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
}
