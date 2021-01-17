import { Component, OnInit } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { Storage } from "@ionic/storage";
import { AccessProviders } from '../providers/post-providers';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  constructor(
    private storage: Storage,
    private acsPrvdr: AccessProviders,
    private toastCONT: ToastController,
    ) { }
    userInfo: any;
    images:any;
    imageCheck:boolean=false;

    offerPrice:number;

    offer(param){
      if(this.offerPrice <= param.price)
      {
        this.homeToast("Son tekliften daha yüksek fiyat girmelisiniz.");
      }
      else{
        return new Promise(resolve=>{
          let body={
              req:'offerImage',
              image_id:param.image_id,
              price:this.offerPrice,
              offerName:this.userInfo.username,
          }
          console.log("body:",body);      
          this.acsPrvdr.postJsonData(body,'images.php').subscribe((res:any)=>{
            if(res.success==true){ 
              this.homeToast(res.msg);   
              this.ngOnInit();
            }
            else{
              this.homeToast(res.msg);
            }
          },(err)=>{
            this.homeToast('Timeout');
          });
        });
      }
    }

    ngOnInit() {
      this.offerPrice = null;
      this.images = null;
      this.imageCheck=false;
    if(this.storage.get('userInfo')){
      this.storage.get('userInfo').then((res)=>{
        this.userInfo=res;
      });
    }
    return new Promise(resolve=>{
      let body={
          req:'home',
      }
      this.acsPrvdr.postJsonData(body,'images.php').subscribe((res:any)=>{
        if(res.success==true){
          this.storage.set('homeImages',res.images);
          this.images=res.images;
          if(this.images?.length > 0)       
            this.imageCheck=true;
        }
        else{
          this.homeToast(res.msg);
        }
      },(err)=>{
        this.homeToast('Timeout');
      });
    });
    }

    async homeToast(a){
    const toast = await this.toastCONT.create({
      message:a,
      duration:1500,
      position:'bottom'
    });
    toast.present();
    }
}
