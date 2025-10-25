# 📰 NewsHub - Haber & Blog Platformu

> **NewsHub**, Node.js ve TypeScript kullanılarak geliştirilmiş; hem **MVC (EJS tabanlı web arayüzü)** hem de **JWT korumalı REST API** sunan, modern, güvenli ve ölçeklenebilir bir **haber & blog platformudur**.  
> Katmanlı mimari prensipleriyle tasarlanmış, kurumsal düzeyde bir Node.js projesidir.

---

## 🎯 Proje Amacı

Bu proje, **Node.js + TypeScript** kullanarak hem **REST API** hem de **EJS tabanlı web arayüzü** üzerinde **katmanlı mimari (MVC)** yapısını uygulamayı hedefler.  
Projede aşağıdaki teknik konular bütünsel olarak ele alınmıştır:

- JWT tabanlı kimlik doğrulama  
- Session tabanlı oturum yönetimi  
- Swagger API dokümantasyonu  
- MongoDB modelleme ve Mongoose ilişkileri  
- Veri doğrulama (express-validator)  
- Global hata filtreleme ve merkezi hata yönetimi  

---

## 👥 Roller

| Rol | Açıklama |
|------|-----------|
| **Admin** | Tüm kullanıcıları ve içerikleri yönetebilir. |
| **User** | Kayıt olabilir, giriş yapabilir, yazı oluşturabilir, düzenleyebilir, silebilir, yorum yapabilir. |

---

## 👥 Örnek Kullanıcı Hesapları

| Rol    | Email                                   | Şifre   |
| ------ | --------------------------------------- | ------- |
| Admin  | [zehra@mail.com](mailto:zehra@mail.com) | 123456  |
| User   | [tuba@mail.com](mailto:tuba@mail.com)   | 123456  |

---

## 🧱 Mimari Yapı

Proje **katmanlı mimari (layered architecture)** prensibiyle inşa edilmiştir.

```
src/
├── controllers/     → HTTP isteklerini karşılar, servisleri çağırır
│   ├── api/         → REST API controller'ları
│   └── web/         → EJS render eden controller'lar
├── services/        → İş mantığı (Business logic)
├── models/          → Mongoose modelleri (User, Post, Comment)
├── routes/          → Web ve API rotaları
├── views/           → EJS şablonları (login, register, dashboard, admin, vs.)
├── middlewares/     → Auth, validation, global error handler
├── utils/           → JWT, bcrypt, swagger config, eRoles vb.
├── validations/     → express-validator kuralları
└── app.ts           → Ana Express uygulaması
```

---

## 💡 Fonksiyonel Özellikler

### 🔐 Authentication & Authorization
- Kullanıcı **register** ve **login** işlemleri  
- Parola **bcrypt** ile hashlenir  
- REST API tarafında **JWT token** ile kimlik doğrulama  
- EJS tarafında **session tabanlı oturum** yönetimi  
- Rol bazlı erişim (Admin vs User)

### 📝 Post Yönetimi
- Yazı oluşturma, düzenleme, silme, listeleme  
- Yazı detay sayfası (yorum alanı ile)  
- REST API üzerinde JWT korumalı CRUD işlemleri  

### 💬 Yorum Yönetimi
- Kullanıcılar yazılara yorum yapabilir  
- Yorumlar yalnızca **Admin** veya **Post sahibi** tarafından silinebilir  

### ⚙️ Validasyon & Hata Yönetimi
- **express-validator** ile form ve API veri kontrolü  
- **Global Error Handler** ile merkezi hata yönetimi  

### 📘 Swagger Dokümantasyonu
- `http://localhost:4000/api-docs` adresinden tüm endpoint’ler interaktif şekilde test edilebilir.  

---

## 🧰 Kullanılan Teknolojiler

| Alan | Teknoloji |
|------|------------|
| Backend | Node.js, Express.js |
| Dil | TypeScript |
| Veritabanı | MongoDB + Mongoose |
| View Engine | EJS, express-ejs-layouts |
| Kimlik Doğrulama | bcrypt, JWT, express-session |
| Doğrulama | express-validator |
| Dokümantasyon | Swagger (swagger-ui-express, swagger-jsdoc) |
| Yardımcılar | dotenv, nodemon, ts-node, multer |

---

## 🧩 REST API Endpointleri

| Kategori | Endpoint | Metod | Açıklama | Yetki |
|-----------|-----------|--------|-----------|--------|
| **AUTH** | `/api/v1/auth/register` | POST | Yeni kullanıcı kaydı | Public |
| **AUTH** | `/api/v1/auth/login` | POST | Kullanıcı girişi ve JWT üretimi | Public |
| **AUTH** | `/api/v1/auth/profile` | GET | Kullanıcı bilgisi | JWT |
| **AUTH** | `/api/v1/auth/logout` | POST | Oturumu sonlandır | JWT |
| **POSTS** | `/api/v1/posts` | CRUD | Yazı oluşturma, listeleme, düzenleme, silme | JWT |
| **COMMENTS** | `/api/v1/comments` | CRUD | Yorum ekleme, listeleme, silme | JWT |
| **CATEGORIES** | `/api/v1/categories` | CRUD | Kategori işlemleri | Admin |
| **SWAGGER** | `/api-docs` | GET | API Dokümantasyonu | Public |

---

## 📄 EJS Sayfaları

| Sayfa | Açıklama |
|--------|-----------|
| `/login` | Kullanıcı giriş formu |
| `/register` | Yeni kullanıcı kayıt formu |
| `/dashboard` | Kullanıcının kendi yazılarını listeler |
| `/posts/new` | Yeni yazı ekleme formu |
| `/posts/:id` | Yazı detay sayfası (yorumlarla birlikte) |
| `/admin` | Admin paneli (tüm kullanıcı ve içerikler) |

---

## ⚙️ Kurulum

```bash
# 1️⃣ Repo’yu klonla
git clone https://github.com/tubanursmsk/NewsHub.git
cd NewsHub

# 2️⃣ Bağımlılıkları yükle
npm install

# 3️⃣ Ortam değişkenleri (.env)
```

`.env` örneği 👇
```dotenv
MONGO_URI=mongodb://localhost:27017/NewsHubDB
SESSION_SECRET=SUPER_SECRET_SESSION_KEY
SECRET_KEY=SUPER_SECRET_JWT_KEY
PORT=3000
NODE_ENV=development
```

```bash
# 4️⃣ Geliştirme modunda çalıştır
npm start
```

Sunucu çalışıyor: http://localhost:4000
Swagger Docs: http://localhost:4000/api-docs

---

## 🎓 Öğrenme Kazanımları

✅ Katmanlı mimariyi tam kapsamlı uygulama  
✅ REST API ve MVC yapılarını tek projede entegre etme  
✅ JWT ve Session farklarını deneyimleme  
✅ Mongoose ilişkilerini (`populate`) etkin kullanma  
✅ Global error handler & validation zinciri kurma  
✅ Swagger ile profesyonel API dokümantasyonu oluşturma  
✅ Kurumsal düzeyde Node.js + TypeScript proje deneyimi kazanma  

---

## 📸 Görseller

### Anasayfa
([Macbook-Air-localhost-vc9rpyhbktjv64.webm](https://github.com/user-attachments/assets/fff5922e-4d4a-4f9f-a59a-9c1d2f24d60f)

---
### Admin Panel
<img width="948" height="491" alt="admin panel" src="https://github.com/user-attachments/assets/c4584697-946e-4714-8c8c-5cb92574a882" />

---
### User Panel
<img width="634" height="281" alt="image" src="https://github.com/user-attachments/assets/65b63a6e-db18-4d06-b194-d6538f565086" />


---
### Post İşlemleri
<img width="676" height="310" alt="yazı edit" src="https://github.com/user-attachments/assets/b35190d9-e691-4b51-8536-99527e812a30" />
[yazı düzenleme.webm](https://github.com/user-attachments/assets/abc3e991-f51c-4489-8668-c7fe383227de)

---
### Yorum
[yorum.webm](https://github.com/user-attachments/assets/4e7408fe-235b-45dc-8ffe-82064f8e9f93)

---
### DataBase
<img width="960" height="516" alt="image" src="https://github.com/user-attachments/assets/7a2326c0-d410-46fd-b13f-7d1b7d49d942" />

---
### Swagger- NewsRestAPI
<img width="680" height="350" alt="image" src="https://github.com/user-attachments/assets/6296b6e7-9837-4e4b-a80f-671c388ca689" />

---
https://github.com/user-attachments/assets/60e0c80f-1059-45ce-b93c-925fc4107d05

---

## 🧾 Lisans

MIT Lisansı © 2025 — [tubanursmsk](https://github.com/tubanursmsk)

---

## 🏷️ Etiketler

`Node.js` `Express.js` `TypeScript` `EJS` `HTML` `CSS`  
`MongoDB` `Mongoose` `JWT` `bcrypt` `swagger`  
`Katmanlı Mimari` `MVC` `REST API` `RBAC` `Session Management`  
`Validation` `Express-Validator` `Project Management` `TeamTask`  
`Backend Development` `API Documentation` `Full Stack` `news` `blog`


