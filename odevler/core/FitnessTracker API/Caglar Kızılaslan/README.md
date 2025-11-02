# 🏃‍♂️ FitnessTracker API

FitnessTracker API; kullanıcıların antrenmanlarını ve hedeflerini takip etmesine olanak sağlayan bir .NET 9.0 (ASP.NET Core) tabanlı RESTful servistir. Kimlik doğrulama için JWT kullanır, veri saklama için SQLite tercih edilmiştir. Swagger üzerinden dokümantasyon ve deneme, Postman ile ise pratik testler yapılabilir.

## ✨ Özellikler
- JWT ile kimlik doğrulama ve yetkilendirme
- SQLite veritabanı (`FitnessApp.db`) ile kalıcı veri saklama
- Swagger UI ile API dokümantasyonu ve canlı deneme
- Postman ile kolay test edilebilir REST endpoint’leri
- Katmanlı mimari: Controller, Service, Mapping (AutoMapper), Middleware (Global hata yakalama)

## 🧰 Teknolojiler ve Bağımlılıklar
- .NET `net9.0`
- ASP.NET Core Web API
- Entity Framework Core (SQLite)
- AutoMapper
- Swagger (Swashbuckle)
- JWT (Microsoft.IdentityModel.Tokens, JwtBearer)

## ⚙️ Kurulum
- Gerekli gereksinimler:
  - `.NET SDK 9.0`
  - macOS/Linux/Windows (proje platform bağımsızdır)

Proje dizinine gelin:

```
cd "FitnessTracker API"
```

Bağımlılıkları geri yükleme ve derleme:

```
dotnet restore
dotnet build
```

## 🚀 Çalıştırma
- Geliştirme profiline göre uygulama URL’leri:
  - `http://localhost:5069`
  - `https://localhost:7271`

Uygulamayı başlatma:

```
dotnet run
```

Swagger arayüzü:

```
http://localhost:5069/swagger/index.html
```

## 🔧 Ortam ve Konfigürasyon
- Konfigürasyon dosyası: `FitnessTracker API/appsettings.json`
- Veritabanı bağlantısı:

```json
{
  "ConnectionStrings": {
    "DefaultConnection": "Data Source = FitnessApp.db"
  },
  "Jwt": {
    "Key": "99b410441c2632f0e6cb5dc4ffe81aa6f93b292a01ec4f2a9675bb703f515ff1"
  }
}
```

- Uygulama, bağlantı dizesindeki göreli yolu proje dizinine göre çözümler ve `FitnessTracker API/FitnessApp.db` dosyasını kullanır.

## 🔐 Kimlik Doğrulama (JWT)
- Login sonrasında API bir JWT üretir ve döner.
- İsteklerde `Authorization: Bearer <token>` header’ı ile kullanılmalıdır.
- Token doğrulama ayarları `Utils/JwtAuthenticationExtension.cs` içinde yapılandırılmıştır.

### 🔑 Örnek Login İsteği
Endpoint: `POST /User/login`

```json
{
  "Email": "veli@mail.com",
  "Password": "123456"
}
```

Response (örnek):

```json
{
  "token": "<jwt-token>",
  "userId": 4,
  "email": "veli@mail.com"
}
```

## 📚 Swagger
- Swagger otomatik olarak etkin (Program.cs içinde `AddSwaggerServices` ve `UseSwaggerServices`).
- Giriş yaptıktan sonra token’ı Swagger’da Authorize düğmesine `Bearer <token>` formatında girerek diğer endpoint’leri çağırabilirsiniz.

## 📬 Postman Kullanımı
- Önce `POST /User/login` ile token alın.
- Sonra aşağıdaki endpoint’leri çağırırken `Authorization: Bearer <token>` ekleyin.
- Örnek istek gövdeleri aşağıdadır.

## 🛣️ API Endpoint’leri

### 👤 User
- `POST /User/register` — Yeni kullanıcı oluşturur.
- `POST /User/login` — Token döner.

### 🏋️ Workout
- `GET /Workout/list` — Kullanıcının tüm workout kayıtlarını listeler.
- `GET /Workout/details/{id}` — Tekil workout detayını döner.
- `POST /Workout/create` — Yeni workout oluşturur.
- `PUT /Workout/update` — Var olan workout’u günceller.
- `DELETE /Workout/delete/{id}` — Workout siler.

### 🎯 Goal
- `GET /Goal/list` — Kullanıcının tüm hedeflerini listeler.
- `GET /Goal/details/{id}` — Tekil hedef detayını döner.
- `POST /Goal/create` — Yeni hedef oluşturur.
- `PUT /Goal/update` — Var olan hedefi günceller.
- `DELETE /Goal/delete/{id}` — Hedef siler.
- `PUT /Goal/update-progress/{id}` — Hedef ilerlemesini günceller (sadece `CurrentValue`).

## 📦 Örnek İstek Gövdeleri

### 🆕 Workout Oluşturma (`POST /Workout/create`)
```json
{
  "ActivityName": "Koşu",
  "Description": "Sabah koşusu",
  "ActivityType": "Cardio",
  "Duration": 45,
  "CaloriesBurned": 400,
  "WorkoutDate": "2025-11-02T07:00:00Z"
}
```

### ♻️ Workout Güncelleme (`PUT /Workout/update`)
```json
{
  "Wid": 1,
  "ActivityName": "Koşu",
  "Description": "Parkta tempolu koşu",
  "ActivityType": "Cardio",
  "Duration": 50,
  "CaloriesBurned": 450,
  "WorkoutDate": "2025-11-02T07:30:00Z"
}
```

### 🆕 Goal Oluşturma (`POST /Goal/create`)
```json
{
  "Title": "Aylık Koşu",
  "Description": "Toplam 50 km koşu",
  "GoalType": "Distance",
  "TargetValue": 50,
  "CurrentValue": 10,
  "Unit": "km",
  "StartDate": "2025-11-01",
  "EndDate": "2025-11-30",
  "IsCompleted": false
}
```

### ♻️ Goal Güncelleme (`PUT /Goal/update`)
```json
{
  "Gid": 1,
  "Title": "Aylık Koşu",
  "Description": "50 km hedefine ilerleme",
  "GoalType": "Distance",
  "TargetValue": 50,
  "CurrentValue": 25,
  "Unit": "km",
  "StartDate": "2025-11-01",
  "EndDate": "2025-11-30",
  "IsCompleted": false
}
```

### 📈 Goal İlerleme Güncelleme (`PUT /Goal/update-progress/{id}`)
Body (raw int):
```json
25
```

## 💾 Veritabanı (SQLite)
- Dosya: `FitnessTracker API/FitnessApp.db`
- EF Core ile `ApplicationDbContext` üzerinden tablo erişimi:
  - `Users`, `Workouts`, `Goals` (DbSet)
- Migration dosyaları `Migrations/` dizininde tutulur.
- Genel komutlar:
  - Migration ekleme: `dotnet ef migrations add <MigrationName>`
  - Veritabanını güncelleme: `dotnet ef database update`

## 🏗️ Mimari ve Katmanlar
- `Controllers/` — HTTP endpoint’leri (User, Workout, Goal)
- `Services/` — İş mantığı (UserService, WorkOutService, GoalService)
- `Mappings/` — AutoMapper profilleri (UserProfile, WorkoutProfile, GoalProfile)
- `Utils/` — Ortak yardımcılar (JwtAuthenticationExtension, ApplicationDbContext, SwaggerExtension)
- `Middleware/` — Global hata yakalama (`GlobalExceptionHandler`)

## 🛡️ Hata Yönetimi
- Tüm beklenmeyen hatalar `GlobalExceptionHandler` ile yakalanır ve standart JSON yanıtı döner:

```json
{
  "error": "<mesaj>",
  "code": 500,
  "timestamp": "<UTC ISO>"
}
```

## 💡 Geliştirme İpuçları
- Token’ı Swagger “Authorize” butonuna `Bearer <token>` formatında girin.
- Postman’da `Authorization` sekmesinde `Bearer Token` seçip token’ınızı ekleyin.
- Tarih alanlarında ISO-8601 formatı (`YYYY-MM-DD` veya `YYYY-MM-DDTHH:mm:ssZ`) kullanın.

## 🖼️ Görseller
![Genel Ekran](İmages/Genel%20Sayfa%20Ekranı.png)
![Login](İmages/User%20Login%20Ekranı.png)
![JWT](İmages/Jwt%20Ekleme%20Ekranı.png)
![Goal List](İmages/Goal%20List%20Ekranı.png)
![Goal Detail](İmages/Goal%20Detail%20Ekranı.png)
![Workout List](İmages/Workout%20List%20Ekranı.png)
![Workout Detail](İmages/Workout%20Detail%20Ekranı.png)
