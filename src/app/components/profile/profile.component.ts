import { Component, OnInit } from '@angular/core';
import { GeneralService } from '../../service/general-service.service'

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  usertype : number
  userId : number
  userChannel: boolean
  arrUser: any[]

  constructor(private generalService : GeneralService) { }

  ngOnInit(): void {
    this.getUser();
    this.getUserType();
  }

  getUser(){
    this.generalService.getProfile()
    .subscribe(res =>{
      console.log(res);
      this.userId = res['user_id'];
      this.generalService.getUser(this.userId)
      .subscribe(res =>{
        this.arrUser = res
        this.usertype = this.generalService.user_type 
        this.generalService.getChannel(this.userId)
        .subscribe(res=>{
          console.log("ChannelID: " + JSON.stringify(res))
        })  
      });
    });
  }

  getUserType(){
    this.generalService.getProfile()
    .subscribe(res =>{
      this.userId = res['user_id'];
      this.generalService.getUser(this.userId)
      .subscribe(res =>{
        this.arrUser = res
        this.usertype = this.arrUser[0].usertype
      });
    });
  }
}
