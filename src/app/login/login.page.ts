import { Component, OnInit } from '@angular/core';
import { MenuController,ToastController,LoadingController,NavController } from '@ionic/angular';
import { ActivatedRoute,Router } from "@angular/router";
import { AccessProviders } from "../providers/post-providers";
import { Storage } from "@ionic/storage";

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  constructor(
    private menu: MenuController,
    private route: Router,
    private toastCONT: ToastController,
    private loadingCONT: LoadingController, 
    private acsPrvdr: AccessProviders,
    private storage: Storage,
    private navCONT: NavController, 
    ) { }
    username:string;
    password:string;

  async loginToast(a){
    const toast = await this.toastCONT.create({
      message:a,
      duration:1500,
      position:'bottom'  
    });
    toast.present();
  }
  async login(){
    if(this.username==""){
      this.loginToast("Kullanıcı adı gerekli!");
    }
    else if(this.password==""){
      this.loginToast("Şifre gerekli!");
    }
    else{
      const loader = await this.loadingCONT.create({
        message: 'Lütfen Bekleyiniz..'
      });
      loader.present();
      return new Promise(resolve=>{
        let body={
            req:'login',
            username:this.username,
            password:this.password,
        }
        this.acsPrvdr.postJsonData(body,'users.php').subscribe((res:any)=>{
          if(res.success==true){
            loader.dismiss();
            this.storage.set('userInfo',res.userInfo);
            this.menu.enable(true);
            this.navCONT.navigateRoot(["/home"]);
          }
          else{
            loader.dismiss();
            this.loginToast(res.msg);
          }
        },(err)=>{
          loader.dismiss();
          this.loginToast('Timeout');
        });
      });
    }
  }
  signin(){
    this.route.navigate(["/signin"]);
  }
  ngOnInit(){
    this.storage.clear();
  }
  
}
