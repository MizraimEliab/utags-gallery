import { Component, OnInit } from '@angular/core';
import {GeneralService} from '../../service/general-service.service';
import { Router } from '@angular/router'
import Swal from 'sweetalert2/dist/sweetalert2.js';  

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  htmlSnippet: string = "<script>maliciousCode()</script>";

  user = {
    email:'',
    password:'',
  }
  constructor(private generalService: GeneralService, private router: Router) { }

  ngOnInit(): void {
  }
  
  signIn(){
    // console.log(this.user)    
    if(this.user.email == '' || this.user.password == ''){
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Email or password are empty!'
      })
    }else{
      this.generalService.signIn(this.user)
      .subscribe(
        res=>{
          if(res.Message == 'Something is wrong'){
            Swal.fire({
              icon: 'error',
              title: 'Oops...',
              text: 'Email or password are wrong!'
            })
          }else{
            let data = JSON.stringify(res);
            let dataJson = JSON.parse(data);          
            localStorage.setItem('token', dataJson.token)
            Swal.fire({
              icon: 'success',
              title: 'Welcome!'
            })        
            this.router.navigate(['/home']);
          }
        },
        err=>{
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Error!'
          })
          console.log(err)
        }
      )
    }      
  }

}
