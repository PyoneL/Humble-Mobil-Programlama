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
Github içerisinde bulunan dosya indirildikten sonra Komut satırında klasör içerisine ;
<br/>

    $  npm install
<br/>komutu ile proje içerisinde tanımlanan gerekli tüm node_module paketleri yüklenir.


! Proje içerisinde galeriden resim seçme işlemi yapıldığı için Ionic Camera kütüphanesi kullanıldı ancak Camera kütüphanesi Browser tarafında desteklenmemekte. Bu sebeple uygulama Android Studio emulator açık iken ve ya android cihaz bilgisayara USB ile bağlı iken  ve geliştirici ayarlarından USB debugging seçeneği açık iken;
<br/>

    $  ionic cordova run android
<br/>
komutu ile çalıştırılabilir.

Dilenirse Browser üzerinde de çalıştırılabilir ancak resim seçme ve yükleme seçeneği çalışmayacaktır. Browser' da çalıştırmak için;
<br/>

    $  ionic serve

 <br/>
 
## Proje hakkında
 
Uygulama giriş, çıkış işlemleri ve veritabanından veri çekme işlemleri server tarafında yazılan php api ile gerçekleştirilir. Uygulama veritabanına, yazılan api üzerinden erişebilir.  

## Uygulamanın kullanımı

Uygulama açılış ekranında kullanıcı giriş, kayıt işlemleri gerçekleştirilir.

<br/><br/>
![](images/1.jpg)
![](images/2.jpg)
<br/><br/>
Anasayfada kullanıcıların satışa sunduğu resimler görüntülenir, teklif yapılabilir.
<br/><br/>
![](images/3.jpg)
<br/><br/>
Profil sayfasında kullanıcı bilgileri güncellenebilir.
<br/><br/>
![](images/4.jpg)
<br/><br/>
Resimlerim sayfasında kullanıcının uygulamaya yüklediği resimler görüntülenir,
<br/><br/>
![](images/5.jpg)
<br/><br/>
Resim ekle butonuna tıklandığında resim ekleme sayfası açılır ve istenilen resim galeride seçilip eklenebilir.
<br/><br/>
![](images/7.jpg)
<br/><br/>
Yan tarafta açılır menu bulunmaktadır tüm menülere buradan ulaşılır.
<br/><br/>
![](images/6.jpg)


