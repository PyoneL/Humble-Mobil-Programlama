import { Component,OnInit } from '@angular/core';
import { LoadingController, NavController, ToastController } from '@ionic/angular';
import { Storage } from "@ionic/storage";
import { AccessProviders } from '../providers/post-providers';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {

  constructor(    
    private storage: Storage,
    private toastCONT: ToastController,
    private acsPrvdr: AccessProviders,
    private loadingCONT: LoadingController,
    private navCONT: NavController,
    ) { }

  userInfo:any;
  id:number=0;
  name: string="";
  surname: string="";
  email: string="";
  username: string="";
  password: string="";
  passwordCheck: string="";

  tname: string="";
  tsurname: string="";
  temail: string="";
  tusername: string="";
  tpassword: string="";
  tpasswordCheck: string="";
  
  async save(){
    if(this.temail==""){
      this.profileToast("E-posta boş bırakılamaz.")
    }
    else if(this.tusername==""){
      this.profileToast("Kullanıcı adı boş bırakılamaz.")
    }
    else if(this.tpassword==""){
      this.profileToast("Şifre boş bırakılamaz.")
    }
    else if(this.tpasswordCheck==""){
      this.profileToast("Doğrulama şifresi boş bırakılamaz.")
    }
    else if(this.tpassword!=this.tpasswordCheck){
      this.profileToast("Şifreler uyuşmuyor.")
    }
    else{
      const loader = await this.loadingCONT.create({
        message: 'Kaydediliyor...'
      });
      loader.present();
      return new Promise(resolve=>{
        let body={
            req:'updateUser',
            id:this.userInfo.id,
            name:this.tname,
            surname:this.tsurname,
            email:this.temail,
            username:this.tusername,
            password:this.tpassword,
        }
        this.acsPrvdr.postJsonData(body,'users.php').subscribe((res:any)=>{
          if(res.success==true){
            loader.dismiss();
            this.profileToast(res.msg);
            this.storage.set('userInfo',res.userInfo);
          }
          else{
            loader.dismiss();
            this.profileToast(res.msg);
          }
          
        },(err)=>{
          loader.dismiss();
          this.profileToast('Timeout');
        });
      });
    }
  }
  async profileToast(a){
    const toast = await this.toastCONT.create({
      message:a,
      duration:1500,
      position:'bottom'
    });
    toast.present();
  }
  ngOnInit(){
    if(this.storage.get('userInfo')){
      this.storage.get('userInfo').then((res)=>{
        this.userInfo=res;
        this.id=this.userInfo.id;
        this.name=this.userInfo.name;
        this.surname=this.userInfo.surname;
        this.email=this.userInfo.email;
        this.username=this.userInfo.username;
        this.password=this.userInfo.password;
      });
    }
  }

}
