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
    firstName:'',
    lastName:'',
    email:'',
    password:'',
    userType:''
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
    if(this.user.firstName == "" || this.user.lastName == "" || this.user.email == "" || this.user.password == "" || this.esEmailValido(this.user.email) == false){
      console.log("Error")
    }else{
      let userType = this.user.email.slice(0, 6);
      console.log(userType);
      //1 Admin - 2 Student
      if(!isNaN(Number(userType))){
        console.log("Student")
        this.user.userType='2';
        console.log("User Student: " + JSON.stringify(this.user))
        // this.generalService.signUp(this.user)
        // .subscribe(
        //   res=>{
        //     console.log(res)
        //     this.router.navigate(['signin']);
        //   },
        //   err=>{
        //     console.log(err)
        //   }
        // )
      }else{
        console.log("Admin")
        this.user.userType='1';
        console.log("User Admin: " + JSON.stringify(this.user))
        // this.generalService.signUp(this.user)
        // .subscribe(
        //   res=>{
        //     console.log(res)
        //     this.router.navigate(['signin']);
        //   },
        //   err=>{
        //     console.log(err)
        //   }
        // )
      }
    }
  }

}
