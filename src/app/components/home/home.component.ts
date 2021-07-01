import { ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router'
import { GeneralService } from '../../service/general-service.service'

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  // @Input() user_id : number
  usertype : number
  userId : number
  arrUser: any[]

  constructor(private router: Router, private generalService : GeneralService) {
   }

  ngOnInit(): void {
    this.getUser();
  }

  newChannel(){
    this.router.navigate(['createNewChannel']);  
  }
  // getUser(){
  //   let id = 3
  //   this.generalService.getUser(id)
  //   .subscribe(
  //     res=>{
  //       let data = JSON.stringify(res);
  //       let dataJson = JSON.parse(data);
  //       this.usertype = dataJson[0].usertype;
  //       console.log('usuario '+dataJson[0].usertype)
  //     },
  //     err=>{
  //       console.log(err)
  //     }
  //   )
  // }
  viewChannel(){
    this.router.navigate(['viewChannel']);  
  }
  getUser(){
    this.generalService.getProfile()
    .subscribe(res =>{
      console.log(res);
      console.log('El id del user es : '+JSON.stringify(res));
      this.userId = res['user_id'];
      this.generalService.getUser(this.userId)
      .subscribe(res =>{
        console.log('los values del user: '+JSON.stringify(res));
        this.arrUser = res
        console.log(this.arrUser);
        this.generalService.user_id = this.arrUser[0].user_id
        this.generalService.user_type = this.arrUser[0].usertype     
          // console.log('variable 1 '+this.generalService.user_id+'variable 2 '+this.generalService.user_type)         

      });
    });
  }

}
