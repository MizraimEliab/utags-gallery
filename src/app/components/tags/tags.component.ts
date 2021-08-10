import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { GeneralService } from 'src/app/service/general-service.service';
import Swal from 'sweetalert2/dist/sweetalert2.js';


@Component({
  selector: 'app-tags',
  templateUrl: './tags.component.html',
  styleUrls: ['./tags.component.css']
})
export class TagsComponent implements OnInit {

  arrTags: any[]
  tagID: any[]
  tagName: any

  constructor(private generalService : GeneralService, private router: Router ,private route: ActivatedRoute) { }

  ngOnInit(): void {
    
    // this.getPosts();
    this.getTagID()
    this.getPosts()
    this.getTagData()
  }

  getTagID(){
    this.tagID = this.route.snapshot.params.id
  }

  getTagData(){
    this.generalService.getTag(this.tagID)
    .subscribe(res=>{
      console.log("///////////////")
      this.tagName = res[0].name
      console.log(this.tagName)
    })
  }


  getPosts(){
    console.log(this.tagID)
    this.generalService.getTagsPost(this.tagID)
    .subscribe(res=>{
      console.log("*************")
      this.arrTags = res
      console.log(this.arrTags)
      if(res.code == "404"){
        Swal.fire({
          icon: 'warning',
          title: 'Oops...',
          text: 'You dont have any post tagged!'
        }).then((result) => {
          window.location.href = "/home";
        })
      }
    })
  }

  viewComplete(id){
    this.router.navigate(['/comments/',id]);
  }
}
