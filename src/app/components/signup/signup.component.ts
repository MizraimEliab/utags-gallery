import { Component, OnInit } from '@angular/core';
import { GeneralService } from '../../service/general-service.service';
import { Router } from '@angular/router'
import Swal from 'sweetalert2/dist/sweetalert2.js'; 

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
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Some field is empty. All fields are required!'
      })
    }else{
      //1 Admin - 2 Student
      console.log("User: " + JSON.stringify(this.user))
      this.generalService.signUp(this.user)
      .subscribe(
        res=>{
          console.log(res)
          Swal.fire({
            icon: 'success',
            title: 'Account created successfully!!'
          })
          this.router.navigate(['signin']);
        },
        err=>{
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Error'
          })
          console.log(err)
        }
      )
    }
  }

}
