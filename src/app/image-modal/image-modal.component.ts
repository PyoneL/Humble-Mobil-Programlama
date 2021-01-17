import { Component, OnInit } from '@angular/core';
import { ModalController, ToastController,LoadingController } from '@ionic/angular';
import { Storage } from "@ionic/storage";
import { AccessProviders } from '../providers/post-providers';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';

@Component({
  selector: 'app-image-modal',
  templateUrl: './image-modal.component.html',
  styleUrls: ['./image-modal.component.scss'],
})
export class ImageModalComponent implements OnInit {

  constructor(
    private modalCONT: ModalController,
    private storage: Storage,
    private acsPrvdr: AccessProviders,
    private toastCONT: ToastController,
    private camera: Camera,
    private loadingCONT: LoadingController, 

  ) { }
  userInfo:any;
  imgUri:any;
  imgCheck:Boolean=false;
  imgBase64:string= "data:image/png;base64,";
  imgScreen:string ;
  imgName:string;
  imgInfo:string;
  deneme:any;


  
  onKeyUserName(event: any) {
    this.imgName = event.target.value;
  }
  onKeyUserInfo(event: any) {
    this.imgInfo = event.target.value;
  }
  async saveImage(){
    await this.storage.get('userInfo').then((res)=>{
      this.userInfo=res;
    });
    const loader = await this.loadingCONT.create({
      message: 'Lütfen Bekleyiniz..'
    });
    
    return new Promise(resolve=>{
      let body={
        req:'saveImage',
        id:this.userInfo.id,
        photo:this.imgUri,
        imgInfo:this.imgInfo,
        imgName:this.imgName,
    }
    loader.present();
      this.acsPrvdr.postJsonData(body,'images.php').subscribe((res:any)=>{
        if(res.success==true){
          loader.dismiss();
          this.imgUri =  res.source;
          this.imgCheck=true;
          this.imageToast(res.msg);
          this.ngOnInit();
          this.closeModal();
        }
        else{
          loader.dismiss();
          this.imageToast(res.msg);
          
        }
      },(err)=>{     
        loader.dismiss(); 
        console.log(err);
        this.imageToast(err);
      });
    });
  }
  async imageToast(a){
    const toast = await this.toastCONT.create({
      message:a,
      duration:5000,
      position:'bottom'
    });
    toast.present();
  }
   imagePick(){
    const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,

    }
    this.camera.getPicture(options).then((imageData) => {
      this.imgUri = imageData;
      this.imgScreen = this.imgBase64 + this.imgUri;
    }, (err) => {this.imageToast(err);});
  }
  closeModal(){
    this.modalCONT.dismiss();
  }

  ngOnInit(){

  }

}
