import { Component } from '@angular/core';
import { Router, ActivatedRoute } from "@angular/router";
import { ToastController,LoadingController } from "@ionic/angular";
import { resolve } from 'dns';
import { promise } from 'protractor';
import { AccessProviders } from "../providers/post-providers";
@Component({
  selector: 'app-signin',
  templateUrl: './signin.page.html',
  styleUrls: ['./signin.page.scss'],
})
export class SigninPage {

  constructor(
    private route: Router,
    private toastCONT: ToastController,
    private acsPrvdr: AccessProviders,
    private loadingCONT: LoadingController,

  ) { }
  
  name: string="";
  surname: string="";
  email: string="";
  username: string="";
  password: string="";
  passwordCheck: string="";

   async signin (){
    if(this.email==""){
      this.signinToast("E-posta adresi gerekli!");
    }
    else if(this.username==""){
      this.signinToast("Kullanıcı adı gerekli!");
    }
    else if(this.password==""){
      this.signinToast("Şifre gerekli!");
    }
    else if(this.passwordCheck==""){
      this.signinToast("Doğrulama şifresi gerekli!");
    }
    else if(this.passwordCheck!=this.password){
      this.signinToast("Şifre doğrulanamadı!");
    }
    else{
      //this.signinToast("Kayıt başarılı.");
      //this.route.navigate(["/login"]);
      const loader = await this.loadingCONT.create({
        message: 'Bekleyiniz...'
      });
      loader.present();
      return new Promise(resolve=>{
        let body={
            req:'signin',
            name:this.name,
            surname:this.surname,
            email:this.email,
            username:this.username,
            password:this.password,
        }
        this.acsPrvdr.postJsonData(body,'users.php').subscribe((res:any)=>{
          if(res.success==true){
            loader.dismiss();
            this.signinToast(res.msg);
            this.route.navigate(["/login"]);
          }
          else{
            loader.dismiss();
            this.signinToast(res.msg);
          }
          
        },(err)=>{
          loader.dismiss();
          this.signinToast('Timeout');
        });
      });
    }
  }
  async signinToast(a){
    const toast = await this.toastCONT.create({
      message:a,
      duration:1500,
      position:'bottom'
    });
    toast.present();
  }


}
