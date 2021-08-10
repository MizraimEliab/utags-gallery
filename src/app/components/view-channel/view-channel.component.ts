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
  channel: boolean
  arrPosts: any[]
  channelID: any

  nameChannel: any
  descriptionChanne: any
  postChannel: any

  post= {
    channel_id: 0,
    title: '',
    image_url: '',
    content: ''
  }

  addChannel = {
    user_id:this.generalService.user_id,
    name:'',
    description:''
  }

  constructor(private generalService : GeneralService, private router : Router) { }

  ngOnInit(): void {
    this.getChannel();
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
    console.log("****************************************************")
    this.post.channel_id = this.generalService.user_channel
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

  getChannel(){
    this.generalService.getUserChannel(this.generalService.user_id)
    .subscribe(res=>{
      console.log(res)
      if(res.Message=="No channels found"){
        this.channel = false;
        console.log("No hay")
      }else{
        console.log("*************************")
        console.log(res)
        this.channel = true;
        this.generalService.user_channel = res[0].channel_id
        this.postChannel = res[0].postquantity
        this.descriptionChanne = res[0].description
        this.nameChannel = res[0].name
        this.getPostChannel(res[0].channel_id)
      }
    })
  }

  newChannel(){
    this.generalService.newChannel(this.addChannel)
    .subscribe(res=>{
      console.log(res)
    })
  }

  getPostChannel(id){
    this.generalService.getPostChannel(id)
    .subscribe(res=>{
      console.log("*****  Ayuda ******")
      let data = JSON.stringify(res);
      let dataJson = JSON.parse(data);  
      this.arrPosts = dataJson
      console.log(this.arrPosts)
    })
  }
}
