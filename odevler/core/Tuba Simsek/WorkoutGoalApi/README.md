# 🏋️‍♀️ WorkoutGoalApi — ASP.NET Core REST API

> **WorkoutGoalApi**, bir fitness takip uygulamasının backend (sunucu tarafı) altyapısını sağlayan **ASP.NET Core REST API** projesidir.  
Kullanıcıların **egzersiz (Workout)** ve **hedef (Goal)** verilerini yönetmesini sağlar.  
Uygulama güvenliği **JWT tabanlı kimlik doğrulama** sistemiyle sağlanır.

---

### 🏛️ Mimari Felsefe ve Tasarım Prensipleri

Proje, **Katmanlı Mimari (N-Tier Architecture)** ve **Hizmet Odaklı Mimari (Service-Oriented Architecture)** prensiplerine uygun olarak tasarlanmıştır.  
Amaç, kodun bakımı kolay, test edilebilir ve ölçeklenebilir bir yapıda olmasıdır.

| Katman | Sorumluluk |
|--------|-------------|
| **Controllers (Sunum Katmanı)** | HTTP isteklerini alır, Service katmanını çağırır, sonucu DTO olarak istemciye döner. |
| **Services (İş Mantığı Katmanı)** | Uygulamanın iş kurallarını içerir. Veriyi `DbContext` aracılığıyla işler ve Controller’a geri döner. |
| **Entities (Veri Katmanı)** | Veritabanı tablolarını temsil eden POCO sınıflarıdır (`User`, `Workout`, `Goal`). |
| **DTO (Data Transfer Objects)** | Katmanlar arası veri iletişimi için kullanılır. Veritabanı modellerinin dış dünyaya doğrudan açılmasını engeller. |

Bu yapı sayesinde **sorumluluk ayrımı (Separation of Concerns)** korunur ve sistem daha modüler hale gelir.

---

## #💻 Teknik Altyapı (Technical Stack)

| Bileşen | Teknoloji |
|----------|------------|
| **Framework** | .NET 8.0 (ASP.NET Core Web API) |
| **Veritabanı** | SQLite (Entity Framework Core 8 ile yönetilir) |
| **Kimlik Doğrulama** | JWT (JSON Web Tokens) |
| **ORM** | Entity Framework Core 8 |
| **API Dokümantasyonu** | Swagger (OpenAPI) |
| **Nesne Eşleştirme** | AutoMapper |
| **Bağımlılık Yönetimi** | .NET Core Dahili Dependency Injection (DI) |
| **Parola Yönetimi** | BCrypt.Net-Next (Güvenli parola hashing için) |

---

## ✨ Temel Özellikler

### 🔐 1. Güvenli Kimlik Doğrulama (JWT)
- **Kayıt Ol:** `POST /api/User/register`  
- **Giriş Yap:** `POST /api/User/login`  
- Workout ve Goal endpoint’leri `[Authorize]` attribute’u ile korunur.  
  Yalnızca geçerli bir **Bearer Token** ile erişilebilir.
  

### 🧠 2. Servis Katmanı (Business Logic)
- Servisler, gelen istekteki JWT token’ı `IHttpContextAccessor` aracılığıyla analiz eder.
- Kullanıcının kimliği (`UserId`) `ClaimTypes.NameIdentifier` üzerinden alınır.
- Tüm CRUD işlemleri kullanıcı bazlı filtrelenir.  
  Böylece kullanıcılar **yalnızca kendi verilerini** görüntüleyebilir veya değiştirebilir.


### ⚙️ 3. Merkezi Hata Yönetimi (Middleware)
- `GlobalExceptionHandler` middleware’i, uygulama genelindeki hataları yakalar.
- Hata loglanır ve istemciye her zaman standart bir JSON formatında döner:
  
  ```json
  {
    "status": 500,
    "message": "Beklenmeyen bir hata oluştu. Lütfen daha sonra tekrar deneyin."
  }


### 🔄 4. Otomatik Nesne Eşleştirme (AutoMapper)

- AppProfile.cs dosyası, Entity ↔ DTO dönüşümlerini otomatikleştirir.
- DateTimeOffset → DateTime gibi karmaşık dönüşümler özel kurallarla yönetilir.


### 🧩 5. API Dokümantasyonu ve Test (Swagger)

- Proje çalıştırıldığında Swagger UI üzerinden tüm endpoint’ler test edilebilir.
- JWT token desteği entegredir.
Kullanıcı giriş yaptıktan sonra Authorize butonuyla token girilerek doğrudan test yapılabilir.

---

## 📁 Proje Yapısı

```
FitnessTrackerAPI/
│
├── Controllers/
│   ├── AuthController.cs
│   ├── WorkoutController.cs
│   └── GoalController.cs
│
├── Dto/
│   ├── WorkoutDto/
│   ├── GoalDto/
│   └── UserDto/
│
├── Models/
│   ├── User.cs
│   ├── Workout.cs
│   └── Goal.cs
│
├── Services/
│   ├── AuthService.cs
│   ├── WorkoutService.cs
│   └── GoalService.cs
│
├── Middleware/
│   └── GlobalExceptionHandler.cs
│
├── Mappings/
│   └── AutoMapperProfile.cs
│
├── appsettings.json
└── Program.cs
```

---

## 🚀 Projeyi Başlatma (Getting Started)

### 🧰 Gereksinimler
- .NET 8.0 SDK
- Visual Studio Code veya Visual Studio 2022

  ---

### ⚡ Kurulum Adımları

### 1️⃣ Repo’yu klonla

```bash
git clone https://github.com/tubanursmsk/WorkoutGoalApi.git
```
```bash
cd WorkoutGoalApi
```

### 2️⃣ Bağımlılıkları yükle
```bash
dotnet restore
```

### 3️⃣ Veritabanını Oluşturun
```bash
dotnet ef database update
```

### 4️⃣ Bu komut, proje ana dizininde WorkoutGoalApi.db adlı SQLite veritabanını oluşturur.

### 5️⃣ Uygulamayı Çalıştırın
```bash
dotnet run
```

### 6️⃣ Swagger Arayüzünü Açın
Tarayıcıdan şu adrese gidin ve tüm endpoint’leri test edin.
```bash
http://localhost:5282/swagger
```

---

## 👥 Örnek Kullanıcı Hesapları

| Rol    | Email                                   | Şifre        |
| ------ | --------------------------------------- | ------------ |
| User   | [ali@mail.com](mailto:ali@mail.com)     | Password1234 |
| User   | [tuba@mail.com](mailto:tuba@mail.com)   | Password1234 |


---

## 🧭 API Kullanım Akışı (Örnek)
Adım	Endpoint	Açıklama
- 1️⃣	POST /api/User/register	Yeni kullanıcı oluştur
- 2️⃣	POST /api/User/login	JWT token al
- 3️⃣	Authorize	Swagger’da token’ı gir
- 4️⃣	POST /api/Workout	Yeni egzersiz ekle
- 5️⃣	GET /api/Goal	Sadece kendi hedeflerini listele

---

## 🧠 Yazılım Tasarım İlkeleri

- Separation of Concerns (SoC) → Katmanlar arası bağımsızlık

- Single Responsibility Principle (SRP) → Her sınıfın tek bir görevi vardır

- Dependency Injection (DI) → Test edilebilir, modüler yapı

- DTO Kullanımı → Güvenli veri aktarımı ve soyutlama


---

## 📸 Görseller

<img width="683" height="384" alt="image" src="https://github.com/user-attachments/assets/5ce144c0-d7d4-4571-aa1a-8119b97df42c" />

---

<img width="673" height="377" alt="image" src="https://github.com/user-attachments/assets/9f511246-6af3-4677-b7d2-4bad57a8c103" />

---

<img width="959" height="511" alt="goal list" src="https://github.com/user-attachments/assets/81dd1634-bcb9-4d31-a6f1-430f6168dcfe" />

---

<img width="956" height="506" alt="goal list id ile" src="https://github.com/user-attachments/assets/fb1a2b87-45d4-4fa9-8fe5-5554fbcdb455" />

---

<img width="676" height="378" alt="image" src="https://github.com/user-attachments/assets/4a37022e-752e-4db5-84dc-27a39d3683f6" />

---

<img width="683" height="384" alt="image" src="https://github.com/user-attachments/assets/ae4a2f73-50b5-4400-a988-8a852568fbb2" />

---

<img width="683" height="222" alt="image" src="https://github.com/user-attachments/assets/489715b4-7b77-40cb-b65c-2d65a335784f" />

---

<img width="713" height="261" alt="image" src="https://github.com/user-attachments/assets/9afbb047-25b9-4d86-bb71-eaf46c9b3351" />

---

<img width="703" height="203" alt="image" src="https://github.com/user-attachments/assets/4035a7fa-393b-479e-a897-400c6dfe348b" />

---

### 🧱 Lisans

MIT Lisansı © 2025 — [tubanursmsk](https://github.com/tubanursmsk)

---

### 🏷️ Etiketler

`Node.js` `ASP.NET Core` `TypeScript` `SQLLite` `DTO` `JWT` `bcrypt` `swagger`  
`Katmanlı Mimari` `MVC` `REST API` `RBAC` `Session Management`  
 `Egzersiz takip` `FitnessTracker API`  
`Backend Development` `API Documentation` `Full Stack` `workout` `goal`











