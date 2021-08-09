import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'
import { GeneralService } from '../../service/general-service.service'

@Component({
  selector: 'app-view-channel',
  templateUrl: './view-channel.component.html',
  styleUrls: ['./view-channel.component.css']
})
export class ViewChannelComponent implements OnInit {
  ListImages: any [];
  usertype : number
  post= {
    channel_id: 4,
    title: '',
    image_url: '',
    content: ''
  }

  constructor(private generalService : GeneralService, private router : Router) { }

  ngOnInit(): void {
  }

  getURL(url:string){
    console.log(url);
    this.post.image_url = url;
    console.log(this.post);
    
  }

  getImagesPixabay(word:string){
    
    this.generalService.getImagesPixabay(word)
    .subscribe(res=>{
      console.log('*******************');
      const json = JSON.stringify(res)
      const datajson = JSON.parse(json);
      //console.log(datajson.images);
      this.ListImages = datajson.images;
      console.log(this.ListImages);
      
    })
  }

  newPost(){
    console.log(this.post)
    this.generalService.newPost(this.post)
      .subscribe(
        res=>{
          console.log(res)
          this.router.navigate(['home'])
        },
        err=>{
          console.log(err)
        }
      )
  }
}
