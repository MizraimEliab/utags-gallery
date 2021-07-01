import { Component, OnInit } from '@angular/core';
import { GeneralService } from '../../service/general-service.service'


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  userId : number
  arrUser: any[]
  usertype : number
  logged: boolean

  constructor(private generalService : GeneralService) { }

  ngOnInit(): void {
    this.getUserType();
    this.loggedIn();
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
      this.generalService.getUser(this.userId)
      .subscribe(res =>{
        this.arrUser = res
        this.usertype = this.arrUser[0].usertype     
      });
    });
    // this.generalService.user_type
  }

}
