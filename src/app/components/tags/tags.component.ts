import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { GeneralService } from 'src/app/service/general-service.service';


@Component({
  selector: 'app-tags',
  templateUrl: './tags.component.html',
  styleUrls: ['./tags.component.css']
})
export class TagsComponent implements OnInit {

  arrFav: any[]

  constructor(private generalService : GeneralService, private router: Router ,private route: ActivatedRoute) { }

  ngOnInit(): void {
    
    this.getPosts();
    
  }


  getPosts(){
    // console.log(this.generalService.user_id)
    this.generalService.getTagsPost(this.route.snapshot.params.id)
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
