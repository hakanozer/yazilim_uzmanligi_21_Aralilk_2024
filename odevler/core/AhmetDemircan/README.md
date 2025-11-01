# 🏋️‍♂️ Titan Fitness Tracker API

Titan, modern fitness takibi için geliştirilmiş güçlü bir RESTful API'dir. .NET 9.0 ile inşa edilmiş bu API, kullanıcıların fitness hedeflerini takip etmelerini, aktivitelerini yönetmelerini ve kişisel fitness yolculuklarını izlemelerini sağlar.

## 🚀 Özellikler

### 🔐 Güvenlik
- **JWT Authentication**: Güvenli kullanıcı kimlik doğrulama
- **BCrypt Password Hashing**: Güvenli şifre saklama
- **Role-based Authorization**: Kullanıcı bazlı yetkilendirme
- **Global Exception Handling**: Merkezi hata yönetimi

### 📊 Core Functionality
- **Kullanıcı Yönetimi**: Kayıt, giriş ve profil yönetimi
- **Aktivite Takibi**: Fitness aktivitelerini oluşturma ve yönetme
- **Hedef Belirleme**: Kişisel fitness hedeflerini ayarlama ve takip etme
- **İlerleme Takibi**: Hedeflerin tamamlanma durumunu izleme

### 🛠️ Teknik Özellikler
- **Entity Framework Core**: SQLite veritabanı entegrasyonu
- **AutoMapper**: Nesne-nesne eşleme
- **Swagger/OpenAPI**: Otomatik API dokümantasyonu
- **Clean Architecture**: Modüler ve sürdürülebilir kod yapısı

## 🏗️ Teknoloji Stack

- **.NET 9.0**: Ana framework
- **ASP.NET Core Web API**: RESTful API geliştirme
- **Entity Framework Core**: ORM ve veritabanı yönetimi
- **SQLite**: Hafif veritabanı çözümü
- **JWT Bearer**: Token tabanlı kimlik doğrulama
- **BCrypt.Net**: Şifre hashleme
- **AutoMapper**: DTO mapping
- **Swagger/Swashbuckle**: API dokümantasyonu

## 📁 Proje Yapısı

```text
Titan/
├── Controllers/           # API Controller'ları
│   ├── UserController.cs     # Kullanıcı yönetimi
│   ├── ActivityController.cs # Aktivite yönetimi
│   └── AimController.cs      # Hedef yönetimi
├── Models/                # Veritabanı modelleri
│   ├── User.cs             # Kullanıcı modeli
│   ├── Activity.cs         # Aktivite modeli
│   └── Aim.cs              # Hedef modeli
├── Dto/                   # Data Transfer Objects
│   └── UserDto/            # Kullanıcı DTO'ları
├── Services/              # İş mantığı servisleri
│   └── UserService.cs      # Kullanıcı servisi
├── Utils/                 # Yardımcı sınıflar
│   ├── ApplicationDbContext.cs    # Veritabanı context
│   └── JwtConfigurationExtensions.cs # JWT yapılandırması
├── Middleware/            # Custom middleware'ler
│   └── GlobalExceptionHandler.cs  # Global hata yönetimi
├── Mappings/              # AutoMapper profilleri
│   └── AppProfile.cs         # Mapping yapılandırması
└── Migrations/            # EF Core migration'ları 
```

## 🚀 Kurulum ve Çalıştırma

### Gereksinimler
- .NET 9.0 SDK
- SQLite (dahili)
- Visual Studio Code veya Visual Studio

### Adım 1: Projeyi Klonlayın
```bash
git clone <repository-url>
cd Titan_FitnessTracker_API_.NET/Titan
```

### Adım 2: Bağımlılıkları Yükleyin
```bash
dotnet restore
```

### Adım 3: Veritabanını Oluşturun
```bash
dotnet ef database update
```

### Adım 4: Uygulamayı Çalıştırın
```bash
dotnet run
Uygulama varsayılan olarak `http://localhost:5049` adresinde çalışacaktır.

> **Not**: Port numarası sistem durumuna göre değişebilir. Uygulamayı çalıştırdıktan sonra terminal çıktısından doğru port numarasını kontrol edin.

## 📖 API Dokümantasyonu

Uygulama çalıştırıldıktan sonra Swagger UI'ya şu adresten erişebilirsiniz:
```
http://localhost:5049
```

> **Port Kontrolü**: Eğer farklı bir port kullanılıyorsa, terminal çıktısından doğru adresi alın.
### 🔑 Authentication

API, JWT Bearer token kullanır. İlk olarak kayıt olun veya giriş yapın:

#### Kayıt Ol
```http
POST /api/user/register
Content-Type: application/json

{
  "firstName": "John",
  "lastName": "Doe",
  "email": "john@example.com",
  "password": "SecurePassword123",
  "sport": "Fitness"
}
```

#### Giriş Yap
```http
POST /api/user/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "SecurePassword123"
}
```

Giriş başarılı olduğunda JWT token alacaksınız. Bu token'ı diğer API çağrılarında kullanın:

```http
Authorization: Bearer <your-jwt-token>
```

## 🎯 API Endpoints

### 👤 User Management
- `POST /api/user/register` - Yeni kullanıcı kaydı
- `POST /api/user/login` - Kullanıcı girişi
- `GET /api/user/profile` - Kullanıcı profili görüntüleme

### 🏃‍♂️ Activity Management
- `GET /api/activity` - Tüm aktiviteleri listele
- `GET /api/activity/{id}` - Belirli aktiviteyi getir
- `POST /api/activity` - Yeni aktivite oluştur
- `PUT /api/activity/{id}` - Aktiviteyi güncelle
- `DELETE /api/activity/{id}` - Aktiviteyi sil

### 🎯 Aim Management
- `GET /api/aim` - Kullanıcının hedeflerini listele
- `GET /api/aim/{id}` - Belirli hedefi getir
- `POST /api/aim` - Yeni hedef oluştur
- `PUT /api/aim/{id}` - Hedefi güncelle
- `DELETE /api/aim/{id}` - Hedefi sil

## 🔒 Güvenlik Özellikleri

### JWT Token Güvenliği
- Tüm korumalı endpoint'ler JWT token gerektirir
- Token'lar kullanıcı kimliğini içerir
- Otomatik token doğrulama

### Veri Güvenliği
- Kullanıcılar sadece kendi verilerine erişebilir
- Şifreler BCrypt ile hashlenmiş olarak saklanır
- SQL injection koruması (Entity Framework)

### Authorization
- Kullanıcı bazlı veri erişimi
- JWT'den kullanıcı kimliği otomatik çıkarılır
- Cross-user data access engellenir

## 🗄️ Veritabanı Şeması

### Users Tablosu
- `Id` (Primary Key)
- `FirstName`
- `LastName`
- `Email` (Unique)
- `Password` (Hashed)
- `Sport`
- `CreatedAt`

### Activities Tablosu
- `Id` (Primary Key)
- `Activity`
- `Detail`
- `DurationMinute`
- `CreatedAt`
- `ValidUntil`

### Aims Tablosu
- `Id` (Primary Key)
- `Goal`
- `UserId` (Foreign Key)
- `IsCompleted`
- `DurationInDays`
- `ActivityGoalId` (Foreign Key)

## 🛠️ Geliştirme

### Migration Oluşturma
```bash
dotnet ef migrations add <MigrationName>
```

### Veritabanını Güncelleme
```bash
dotnet ef database update
```

### Test Çalıştırma
```bash
dotnet test
```

## 📝 Yapılandırma

### appsettings.json
```json
{
  "ConnectionStrings": {
    "DefaultConnection": "Data Source=Titan.db"
  },
  "JwtSettings": {
    "SecretKey": "your-secret-key",
    "Issuer": "TitanAPI",
    "Audience": "TitanUsers",
    "ExpiryMinutes": 60
  }
}
