import { Component, OnInit } from '@angular/core';
import { GeneralService } from '../../service/general-service.service'

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

  constructor(private generalService : GeneralService) { }

  ngOnInit(): void {
    this.getUser();
    this.getPosts();
  }

  getUser(){
    this.generalService.getProfile()
    .subscribe(res =>{
      console.log(res);
      console.log('El id del user es : '+JSON.stringify(res));
      this.userId = res['user_id'];
      this.generalService.getUser(this.userId)
      .subscribe(res =>{
        console.log('los values del user: '+JSON.stringify(res));
        this.arrUser = res
        this.generalService.user_id = this.arrUser[0].user_id
        this.generalService.user_type = this.arrUser[0].usertype     
        this.generalService.user_name = this.arrUser[0].name
        this.usertype = this.generalService.user_type 
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
      this.arrPost = res
    })
  }
  likePost(id){
    this.generalService.postLiked(id)
    .subscribe(res=>{
      console.log(res)
      this.getPosts()
    })
  }

}
