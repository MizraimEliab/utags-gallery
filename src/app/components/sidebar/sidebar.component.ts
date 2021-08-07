import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { GeneralService } from '../../service/general-service.service'

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
  usertype : number
  logged: boolean

  constructor(private generalService : GeneralService) { }

  ngOnInit(): void {
    this.getUserType();
    this.loggedIn();
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
