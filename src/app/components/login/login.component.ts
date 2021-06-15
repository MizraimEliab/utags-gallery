import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../services/auth.service';
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

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
  }

  signIn(){
    // console.log(this.user)
    this.authService.signIn(this.user)
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
