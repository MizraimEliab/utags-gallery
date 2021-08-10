import { Component, OnInit } from '@angular/core';
import { GeneralService } from '../../service/general-service.service';
import { Router } from '@angular/router'

@Component({
  selector: 'app-fav',
  templateUrl: './fav.component.html',
  styleUrls: ['./fav.component.css']
})
export class FavComponent implements OnInit {

  arrFav: any[]

  constructor(private generalService: GeneralService,private router: Router) { }

  ngOnInit(): void {
    this.getPosts()
  }


  getPosts(){
    // console.log(this.generalService.user_id)
    this.generalService.getFavPost(this.generalService.user_id)
    .subscribe(res=>{
      console.log("*************")
      this.arrFav = res
      console.log(res)
    })
  }

  removePost(id){
    this.generalService.deleteFavPost(id)
    .subscribe(res=>{
      console.log(res)
      this.getPosts()
    })
  }

  viewComplete(id){
    this.router.navigate(['/comments/',id]);
  }

}
