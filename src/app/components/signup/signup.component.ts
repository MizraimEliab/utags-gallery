import { Component, OnInit } from '@angular/core';
import { GeneralService } from '../../service/general-service.service';
import { Router } from '@angular/router'

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  user = {
    name:'',
    lastname:'',
    email:'',
    password:''
    // userType:''
  }
  

  constructor(private generalService: GeneralService, private router: Router) { }

  ngOnInit(): void {
  }
  esEmailValido(email: string):boolean {
    let mailValido = false;
      'use strict';

      let EMAIL_REGEX = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

      if (email.match(EMAIL_REGEX)){
        mailValido = true;
      }
    return mailValido;
  }
  signUp(){
    if(this.user.name == "" || this.user.lastname == "" || this.user.email == "" || this.user.password == "" || this.esEmailValido(this.user.email) == false){
      console.log("Error")
    }else{
      //1 Admin - 2 Student
      console.log("User: " + JSON.stringify(this.user))
      this.generalService.signUp(this.user)
      .subscribe(
        res=>{
          console.log(res)
          this.router.navigate(['signin']);
        },
        err=>{
          console.log(err)
        }
      )
    }
  }

}
