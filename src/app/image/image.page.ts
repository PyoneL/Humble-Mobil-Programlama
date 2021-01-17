import { Component, OnInit } from '@angular/core';
import { ModalController, NavController, ToastController } from '@ionic/angular';
import { ImageModalComponent } from '../image-modal/image-modal.component';
import { Storage } from "@ionic/storage";
import { AccessProviders } from '../providers/post-providers';

@Component({
  selector: 'app-image',
  templateUrl: './image.page.html',
  styleUrls: ['./image.page.scss'],
})
export class ImagePage implements OnInit {

  constructor(
    private modalCONT: ModalController,
    private storage: Storage,
    private acsPrvdr: AccessProviders,
    private toastCONT: ToastController,
    private navCONT: NavController,
  ) { }

  userInfo:any;
  images:any;
  startValue:any;
  imageCheck:boolean;
  
  async saleOpen(param){
    if(this.startValue==null){
      this.imageToast("Başlangıç değeri boş bırakılamaz.");
    }  
    else if(param.isSale=="Satılık" ){
      this.imageToast("Resim zaten satışta.");
    }
    else{
      await this.storage.get('userInfo').then((res)=>{
        this.userInfo=res;
      });
      return new Promise(resolve=>{
        let body={
            req:'openSale',
            id:this.userInfo.id,
            price:this.startValue,
            image_id:param.image_id,
        }
        this.acsPrvdr.postJsonData(body,'images.php').subscribe((res:any)=>{
          if(res.success==true){
            this.ngOnInit();
            this.imageToast(res.msg);
          }
          else{
            this.imageToast(res.msg);
          }
        },(err)=>{
          this.imageToast('Timeout');
        });
      });
    }
  }
  async saleClose(param){
    if(param.isSale=="Satılık değil"){
      this.imageToast("Resim zaten satılık değil.");
    }  
    else{
      await this.storage.get('userInfo').then((res)=>{
        this.userInfo=res;
      });
      return new Promise(resolve=>{
        let body={
            req:'closeSale',
            id:this.userInfo.id,
            image_id:param.image_id,
        }
        this.acsPrvdr.postJsonData(body,'images.php').subscribe((res:any)=>{
          if(res.success==true){
            this.imageToast(res.msg);
            this.ngOnInit();
          }
          else{
            this.imageToast(res.msg);
          }
        },(err)=>{
          this.imageToast('Timeout');
        });
      });
    }
  }
  async removeImage(param){
      await this.storage.get('userInfo').then((res)=>{
        this.userInfo=res;
      });
      return new Promise(resolve=>{
        let body={
            req:'deleteImage',
            id:this.userInfo.id,
            image_id:param,
        }
        this.acsPrvdr.postJsonData(body,'images.php').subscribe((res:any)=>{
          if(res.success==true){
            this.imageToast(res.msg);
            this.ngOnInit();
          }
          else{
            this.imageToast(res.msg);
          }
        },(err)=>{
          this.imageToast('Timeout');
        });
      });
    
  }
  async imageToast(a){
    const toast = await this.toastCONT.create({
      message:a,
      duration:1500,
      position:'bottom'
    });
    toast.present();
  }
  async openModal() {
    const modal = await this.modalCONT.create({
      component: ImageModalComponent
    });
    return await modal.present();
  }

  async ngOnInit() {
    this.imageCheck=false;
    await this.storage.get('userInfo').then((res)=>{
      this.userInfo=res;
    });
    return new Promise(resolve=>{
      let body={
          req:'image',
          id:this.userInfo.id,
      }
      this.acsPrvdr.postJsonData(body,'images.php').subscribe((res:any)=>{
        if(res.success==true){
          this.storage.set('images',res.images);
          this.images=res.images;
          if(this.images?.length>0)  
              this.imageCheck=true;
        }
        else{
          this.imageToast(res.msg);
        }
      },(err)=>{
        this.imageToast('Timeout');
      });
    });
  }
}
