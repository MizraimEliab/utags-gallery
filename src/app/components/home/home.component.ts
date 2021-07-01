import { ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router'
import { GeneralService } from '../../service/general-service.service'

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  usertype : number
  userId : number
  userChannel: boolean
  arrUser: any[]
  arrPost: any[]

  constructor(private generalService : GeneralService) {
   }

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
          // this.generalService.user_channel = res
          // this.userChannel = res
          console.log("ChannelID: " + JSON.stringify(res))
          // if(!isNaN(res)){
          //   console.log("Hay canal")
          // }else{
          //   console.log("No Hay canal")
          // }
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
