import { Component, OnInit } from '@angular/core';
import { GeneralService } from '../../service/general-service.service';
import { Router } from '@angular/router'

@Component({
  selector: 'app-new-channel',
  templateUrl: './new-channel.component.html',
  styleUrls: ['./new-channel.component.css']
})
export class NewChannelComponent implements OnInit {

  constructor(private generalService: GeneralService, private router: Router) { }

  channel = {
    user_id:'1',
    name:'',
    description:''
  }

  ngOnInit(): void {
  }

  createNewChannel(){
    console.log(JSON.stringify(this.channel));
    this.generalService.newChannel(this.channel)
      .subscribe(
        res=>{
          console.log(res)
          this.router.navigate(['home']);
        },
        err=>{
          console.log(err)
        }
      )
  }

}
