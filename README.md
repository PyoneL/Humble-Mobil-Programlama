## Kocaeli Üniversitesi - Bilgisayar Mühendisliği
### Mobil Programlama Proje
#### Cemre Can Kaya - 190201137

<br/>

## Humble 

Humble kullanıcıların resimlerini, tablolarını satışa sunabileceği bir platformdur.

## Kullanılan ekstra paketler

[Ionic Data Storage](https://ionicframework.com/docs/angular/storage) <br/>
[Ionic Camera](https://ionicframework.com/docs/native/camera)

## Nasıl Çalıştırılır

<br/>

Github içerisinde bulunan dosya indirildikten sonra Komut satırında klasör içerisine ;

    $  npm install

komutu ile proje içerisinde tanımlanan gerekli tüm node_module paketleri yüklenir.
<br/><br/>

! Proje içerisinde galeriden resim seçme işlemi yapıldığı için Ionic Camera kütüphanesi kullanıldı ancak Camera kütüphanesi Browser tarafında desteklenmemekte. 

<br/>

Bu sebeple uygulama Android Studio emulator ve ya android cihaz ile çalıştırılabilir. 
<br/>

>Minimum Android SDK sürümü (27.+)<br/>
>Apk dosyası klasörü içerisinden kurulum yapılabilir.

<br/>

Diğer bir şekilde Android Studio emulator açık iken ve ya android cihaz USB debugging özelliği açık ve usb ile bilgisayara bağlı iken;

    $  ionic cordova run android

komutu ile çalıştırılabilir.


<br/>
Dilenirse Browser üzerinde de çalıştırılabilir ancak resim seçme ve yükleme seçeneği çalışmayacaktır. Browser' da çalıştırmak için;
<br/>

    $  ionic serve

<br/>
 
## Proje hakkında
 
Uygulama giriş, çıkış işlemleri ve veritabanından veri çekme işlemleri server tarafında yazılan Php API ile gerçekleştirilir. Uygulama veritabanına, yazılan API üzerinden erişebilir.  

## Uygulamanın kullanımı

Uygulama açılış ekranında kullanıcı giriş, kayıt işlemleri gerçekleştirilir.

<br/><br/>
![](images/1.jpg)
![](images/2.jpg)
<br/><br/>
Yan tarafta açılır menu bulunmaktadır tüm menülere buradan ulaşılır.
<br/><br/>
![](images/6.jpg)
<br/><br/>
Anasayfada kullanıcıların satışa sunduğu resimler görüntülenir, resimlere teklif yapılabilir.
<br/><br/>
![](images/3.jpg)
<br/><br/>
Profil sayfasında kullanıcı bilgileri güncellenebilir.
<br/><br/>
![](images/4.jpg)
<br/><br/>
Resimlerim sayfasında kullanıcının uygulamaya yüklediği resimler görüntülenir, kullanıcı uygulamaya yüklediği resimlerini buradan başlangıç fiyatı ile birlikte satışa çıkarabilir, satıştan çekebilir ve ya resmini uygulamadan silebilir.
<br/><br/>
![](images/5.jpg)
<br/><br/>
Resimlerim sayfasında, Resim ekle butonuna tıklandığında resim ekleme sayfası açılır ve istenilen resim galeriden seçilip eklenebilir.
<br/><br/>
![](images/7.jpg)
<br/><br/>


