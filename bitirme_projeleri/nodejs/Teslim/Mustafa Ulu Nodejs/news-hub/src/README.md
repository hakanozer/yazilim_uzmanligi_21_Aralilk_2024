# NewsHub

Node.js + Express + TypeScript + MongoDB tabanlı haber/blog sistemi.

## Özellikler

### EJS (Session)
- Register / Login
- Session korumalı sayfalar (Dashboard vb.)
- Post CRUD (Create, Read, Update, Delete)
- Comment ekleme / silme
- Admin panel (EJS)

### REST API (JWT)
- Auth: register / login / profile / refresh / logout
- Posts API: CRUD + yetki kontrolü (admin veya post sahibi)
- Comments API: ekleme / silme (admin veya post sahibi)
- Admin API: kullanıcı listeleme, post listeleme, rol değiştirme
- Swagger Docs: `/api-docs`

---

## Kurulum

### 1) Paketleri yükle
```bash
npm install
NewsHub – Haber & Blog Platformu

Node.js + TypeScript + Express + MongoDB (Mongoose) + MVC + REST API + EJS + JWT + Swagger

NewsHub; kullanıcıların kayıt olup giriş yapabildiği, post (haber/blog) oluşturabildiği, yorum ekleyebildiği ve admin rolü ile yönetim işlemlerinin yapılabildiği tam kapsamlı bir backend + EJS arayüz projesidir.

Bu projede aynı anda:

EJS tarafında session tabanlı authentication

REST API tarafında JWT tabanlı authentication
birlikte kullanılmıştır.

Proje Özeti (Bu projede ne yaptık?)

Bu projeyi katmanlı mimari (MVC) ile kurduk ve aşağıdaki modülleri geliştirdik:

1) Proje kurulumu ve çalıştırma

Node.js + TypeScript ortamı kuruldu

Express server ayağa kaldırıldı

MongoDB bağlantısı yapıldı

Proje 5000 portunda çalıştırıldı

/health endpoint’i ile sistemin ayakta olduğu doğrulandı

2) MVC mimarisi ve klasör yapısı

Proje şu şekilde katmanlara ayrıldı:

config/ → DB, session, swagger gibi proje konfigürasyonları

controllers/ → Request/Response kontrolü (iş akışını başlatır)

services/ → İş mantığı (auth işlemleri gibi)

models/ → MongoDB (Mongoose) modelleri

routes/ → API + View route tanımları

middlewares/ → Auth, role, validation, global error handler

views/ → EJS sayfaları (login/register/dashboard/post detay vs.)

utils/ → AppError gibi yardımcı yapılar

seed.ts → örnek kullanıcı/post/comment üretme script’i

3) Authentication & Authorization (Kimlik doğrulama)

Bu projede iki farklı giriş sistemi kuruldu:

A) EJS tarafı (Session ile)

Kullanıcı login olunca session içine kaydedildi:

id

email

role (admin/user)

name

Session yoksa korumalı sayfalara girince /login sayfasına yönlendirildi

B) REST API tarafı (JWT ile)

Bearer Token mantığı kuruldu

requireAuth middleware yazıldı:

Authorization header içinden token alır

Token doğrular

req.user içine userId ve role bilgisini ekler

requireRole(["admin"]) ile admin endpoint’leri korundu

4) Kullanıcı işlemleri

Register (kayıt) işlemi yapıldı

Login (giriş) işlemi yapıldı

Şifreler bcrypt ile hashlenerek veritabanına kaydedildi

Admin/User rol sistemi kuruldu

5) Post sistemi (CRUD)

Post yönetimi tamamen çalışır hale getirildi:

Post oluşturma

Post listeleme

Post detay görüntüleme

Post güncelleme

Post silme

Yetki kontrolü:

Normal user sadece kendi postunu güncelleyebilir/silebilir

Admin her postu yönetebilir

Validation:

title minimum 3 karakter

content minimum 10 karakter

6) Comment sistemi

Yorum sistemi eklendi:

Post’a yorum ekleme

Yorumları listeleme

Yorum silme

Yetki kontrolü:

Admin yorum silebilir

Post sahibi yorum silebilir

7) Admin Panel / Admin API

Admin işlemleri REST API üzerinden sağlandı:

Admin endpoint kontrolü

Kullanıcıları listeleme

Postları listeleme

Kullanıcının rolünü değiştirme (user → admin / admin → user)

8) Swagger Dokümantasyonu

Tüm REST API endpoint’leri Swagger ile belgelendi.

Swagger adresi:

http://localhost:5000/api-docs

Swagger üzerinden:

Login olup token alınabilir

Authorize butonuna token girilerek protected endpoint’ler test edilebilir

9) Global Error Handling

404 Not Found middleware eklendi

Merkezi hata yönetimi (errorHandler) eklendi

API tarafında hatalar JSON response olarak döndürülüyor

10) Seed sistemi (örnek veri üretme)

Projeye seed script eklendi:

DB bağlantısı yapılır

Koleksiyonlar temizlenir

Örnek kullanıcılar oluşturulur

Örnek postlar ve yorumlar oluşturulur.

Kurulum (Adım adım)
1) Projeyi indir
git clone <repo_link>
cd news-hub

2) Paketleri yükle
npm install

3) .env dosyasını oluştur

Proje ana dizinine .env oluştur ve aşağıdakini ekle:

PORT=5000
MONGO_URI=mongodb://localhost:27017/newshub

JWT_SECRET=supersecret
JWT_EXPIRES_IN=15m

JWT_REFRESH_SECRET=superrefreshsecret
JWT_REFRESH_EXPIRES_IN=7d

SESSION_SECRET=sessionsecret
NODE_ENV=production

4) Seed çalıştır (örnek veri oluştur)
npm run seed


Seed çalışınca terminalde şu bilgileri görürsün:

Admin => mustafa@test.com / 123456

User => mustafa1@test.com / 123456

5) Projeyi çalıştır
npm run dev

Proje Linkleri

Health Check: http://localhost:5000/health

Swagger Docs: http://localhost:5000/api-docs

Test Kullanıcıları
Admin Hesap

Email: mustafa@test.com

Password: 123456

Normal User Hesap

Email: mustafa1@test.com

Password: 123456

REST API Endpoint’leri
Auth

POST /api/v1/auth/register → Yeni kullanıcı kaydı

POST /api/v1/auth/login → Login + JWT üretir

GET /api/v1/auth/profile → Giriş yapan kullanıcı bilgisi (JWT gerekli)

POST /api/v1/auth/refresh → Access token yenileme (JWT refresh gerekli)

POST /api/v1/auth/logout → Logout (JWT gerekli)

User

GET /api/v1/me → Current user (JWT gerekli)

Posts

GET /api/v1/posts → Postları listeler

GET /api/v1/posts/:id → Post detayı + yorumlar

POST /api/v1/posts → Post oluşturur (JWT gerekli)

PUT /api/v1/posts/:id → Post günceller (JWT gerekli)

DELETE /api/v1/posts/:id → Post siler (JWT gerekli)

POST /api/v1/posts/:id/comments → Post’a yorum ekler (JWT gerekli)

Comments

DELETE /api/v1/comments/:id → Yorum siler (JWT gerekli)

Admin

GET /api/v1/admin → Admin kontrol endpoint’i (JWT + admin)

GET /api/v1/admin/users → Tüm kullanıcılar (JWT + admin)

GET /api/v1/admin/posts → Tüm postlar (JWT + admin)

PATCH /api/v1/admin/users/:id/role → Kullanıcı rol güncelleme (JWT + admin)

Kullanılan Teknolojiler

Node.js

TypeScript

Express.js

MongoDB + Mongoose

EJS

express-session

JWT (jsonwebtoken)

bcrypt

Swagger (swagger-jsdoc + swagger-ui-express)

Validation (Joi / Zod yapıları entegre edildi)

Sonuç

Bu proje ile:

MVC mimarisi uygulandı

Session + JWT birlikte kullanıldı

Post ve Comment CRUD tamamlandı

Admin rol sistemi kuruldu

Swagger ile dokümantasyon hazırlandı

Seed sistemi ile proje tek komutla demo hale getirildi

---
