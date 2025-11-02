# 🏋️‍♂️ FitnessTracker API

**FitnessTracker API**, kullanıcıların egzersiz (Workout) ve hedef (Goal) verilerini yönetebildiği bir **ASP.NET Core Web API** uygulamasıdır.

---

## 🖼️ Swagger Arayüzü
Proje, Swagger ile test edilebilir.  
Oturum açtıktan sonra `[Authorize]` butonuna tıklayarak **Bearer Token** tanımlayabilir ve API’yi doğrudan tarayıcıdan test edebilirsin.

![Swagger Arayüzü](FitnessTracker/screenshots/swagger.png)

---

## 🚀 Özellikler
- 🧾 Kullanıcı kayıt/giriş (JWT Authentication)
- 🏃‍♂️ Egzersiz CRUD (Workout)
- 🎯 Hedef CRUD (Goal)
- ⚙️ Global hata yakalama (Middleware)
- 💾 SQLite veritabanı (Entity Framework Core)
- 🔒 JWT tabanlı kimlik doğrulama ve Swagger üzerinden token testi
- 📦 Katmanlı Mimari (Controller → Service → Data)
- ⚙️ AutoMapper + DTO kullanımı

---

## 🏗️ Kullanılan Teknolojiler
- **.NET 9.0**
- **Entity Framework Core (SQLite)**
- **BCrypt.Net-Next** → Şifre hashleme
- **JWT Bearer Authentication**
- **AutoMapper**
- **Swagger (Swashbuckle)**
