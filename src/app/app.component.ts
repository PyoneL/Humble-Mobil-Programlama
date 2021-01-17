import { Component } from '@angular/core';
import { MenuController, Platform,NavController, LoadingController, ToastController } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { AccessProviders } from './providers/post-providers';
import { Storage } from "@ionic/storage";

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private menu: MenuController,
    private navCONT: NavController,
    private acsPrvdr: AccessProviders,
    private storage: Storage,
    private loadingCONT: LoadingController,
    private toastCONT: ToastController,

  ) {
    this.initializeApp();
  }
  username:string;
  
  update(){
    this.storage.get('userInfo').then((res)=>{
      this.username=res.username;
    });
  }
    
  
  async logout(){
    const loader = await this.loadingCONT.create({
      message: 'Lütfen Bekleyiniz..'
    });
    loader.present();
    return new Promise(resolve=>{
      let body={
          req:'logout',
          username:this.username,
      }
      this.acsPrvdr.postJsonData(body,'users.php').subscribe((res:any)=>{
        if(res.success==true){
          loader.dismiss();
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
  
  async loginToast(a){
    const toast = await this.toastCONT.create({
      message:a,
      duration:2000,
      position:'bottom'
    });
    toast.present();
  }


  hideMenu(route){
    this.menu.close();
    switch (route){
      case 'home': this.navCONT.navigateRoot(['/home']); break;
      case 'profile': this.navCONT.navigateRoot(['/profile']); break;
      case 'image': this.navCONT.navigateRoot(['/image']); break;
      case 'sale': this.navCONT.navigateRoot(['/sale']); break;
      case 'logout': 
        this.logout();  
        this.storage.remove('userInfo'); 
        this.menu.enable(false);
        this.navCONT.navigateRoot(['/login']); 
        break;
    }
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
      this.menu.enable(false);
     //this.menu.open();
    });
    this.storage.remove('userInfo');
    this.storage.get('userInfo').then((res)=>{
      if(res==null){
        this.navCONT.navigateRoot(['/login']); 
      }
      else{
        this.navCONT.navigateRoot(['/home']); 
      }
    });
  }
}
