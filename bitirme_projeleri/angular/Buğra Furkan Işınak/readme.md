# Angular Learning Management System

Bu proje, Angular ile geliştirilmiş bir **LMS (Learning Management System / Öğrenme Yönetim Sistemidir)**.  
Öğrenciler kurslara kayıt olabiliyor, kurslardan çıkabiliyor; yöneticiler kursları ve kullanıcıları yönetebiliyor.

---

## 📁 Proje Özellikleri

- Kullanıcı kimlik doğrulama (login / token bazlı)  
- Kullanıcı rolleri: **student**, **admin**  
- Kurs listesi görüntüleme, kurs detay sayfası  
- Kursa katılma / çıkma işlevselliği  
- Stok yönetimi (kurs kontenjanı benzeri)  
- Navbar ve footer görünürlüğü token/user durumuna göre yönetimi  
- Kullanıcı bilgileri **AuthService** üzerinden yönetiliyor  
- LocalStorage üzerinde token ve kullanıcı verisi tutuluyor  

---

## 🛠 Teknolojiler / Araçlar

- Angular (versiyon projenin package.json’unda belirtildiği versiyon)  
- RxJS (BehaviorSubject, Observables)  
- TypeScript  
- Angular Router  
- Bootstrap / CSS (arayüz tasarımı için)  
- REST API (backend tarafı ayrı bir servis)  

---

## 🚀 Kurulum & Çalıştırma

1. Repository’i klonlayın:  
   ```bash
   git clone https://github.com/furkanisinak/angular-lms-bitirme-projesi.git


### Proje klasörüne girin:

```bash
1- cd angular-lms-bitirme-projesi

2- npm install

3- npm start
```




### Proje Yapısı (Klasörler ve Dosyalar)
```bash
src/
  app/
    components/        — Navbar, Footer, Bar vb. bileşenler  
    services/          — Api servisi, AuthService  
    models/            — Product, User gibi arayüzler (interfaces)  
    pages/             — Login, Register, Dashboard vs sayfalar  
    product-item/      — Ürün / kurs kartı bileşeni  
  assets/
  environments/         — environment.ts, environment.prod.ts  
  index.html  
  main.ts  
```


