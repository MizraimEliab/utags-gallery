import { Component, OnInit } from '@angular/core';
import {GeneralService} from '../../service/general-service.service';
import { Router } from '@angular/router'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  user = {
    username:'',
    password:'',
  }

  constructor(private generalService: GeneralService, private router: Router) { }

  ngOnInit(): void {
  }

  signIn(){
    // console.log(this.user)
    this.generalService.signIn(this.user)
      .subscribe(
        res=>{
          this.router.navigate(['/home']);
        },
        err=>{
          console.log(err)
        }
      )
  }

}
