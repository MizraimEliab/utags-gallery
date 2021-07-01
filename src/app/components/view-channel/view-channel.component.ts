import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'
import { GeneralService } from '../../service/general-service.service'

@Component({
  selector: 'app-view-channel',
  templateUrl: './view-channel.component.html',
  styleUrls: ['./view-channel.component.css']
})
export class ViewChannelComponent implements OnInit {
  usertype : number
  constructor(private generalService : GeneralService, private router : Router) { }

  ngOnInit(): void {
    this.getUser();
  }

  getUser(){
    let id = 3
    this.generalService.getUser(id)
    .subscribe(
      res=>{
        let data = JSON.stringify(res);
        let dataJson = JSON.parse(data);
        this.usertype = dataJson[0].usertype;
        console.log('usuario '+dataJson[0].usertype)
      },
      err=>{
        console.log(err)
      }
    )
  }
}
