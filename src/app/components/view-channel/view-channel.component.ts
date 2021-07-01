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
  post= {
    channel_id: '4',
    title: '',
    content: ''
  }

  constructor(private generalService : GeneralService, private router : Router) { }

  ngOnInit(): void {
  }

  newPost(){
    console.log(this.post)
    this.generalService.newPost(this.post)
      .subscribe(
        res=>{
          console.log(res)
          this.router.navigate(['home'])
        },
        err=>{
          console.log(err)
        }
      )
  }
}
