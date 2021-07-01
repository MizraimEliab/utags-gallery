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
    email:'',
    password:'',
  }

  constructor(private generalService: GeneralService, private router: Router) { }

  ngOnInit(): void {
  }
  
  signIn(){
    console.log(this.user)
    this.generalService.signIn(this.user)
      .subscribe(
        res=>{
          console.log(res);
          // let data = JSON.stringify(res);
          // let dataJson = JSON.parse(data);
          // localStorage.setItem('token', dataJson.token)
          
          // this.router.navigate(['/home']);
        },
        err=>{
          console.log(err)
        }
      )
  }

}
