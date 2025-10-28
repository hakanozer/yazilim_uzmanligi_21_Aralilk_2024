# 📰 NewsHub - Haber & Blog Platformu

Modern, güvenli ve ölçeklenebilir bir haber platformu. Node.js, TypeScript, Express.js ve MongoDB kullanılarak geliştirilmiştir.

## 🚀 Özellikler

### 🔐 Kimlik Doğrulama & Yetkilendirme
- JWT tabanlı REST API kimlik doğrulama
- Session tabanlı EJS oturum yönetimi
- Rol bazlı erişim kontrolü (User, Moderator, Admin)
- Access Token (7 gün) ve Refresh Token (30 gün)
- CryptoJS ile şifre hashleme

### 📝 Haber Yönetimi
- CRUD işlemleri (Oluştur, Oku, Güncelle, Sil)
- Kategori bazlı filtreleme
- Sayfalama (Pagination)
- Görüntülenme sayacı
- Resim yükleme (Multer)
- Slug oluşturma

### 💬 Yorum Sistemi
- Haberlere yorum ekleme
- Yorum silme (Admin veya yorum sahibi)
- Yorum güncelleme
- Sayfalanmış yorum listesi

### 👤 Kullanıcı Yönetimi
- Kullanıcı profili
- Profil güncelleme
- Şifre değiştirme
- Kullanıcının haberleri

### 🛡️ Admin Paneli
- Dashboard (İstatistikler)
- Kullanıcı yönetimi
- Haber yönetimi
- Rol düzenleme
- Kullanıcı/Haber silme

### 🎨 Frontend
- Modern EJS template engine
- Bootstrap 5 responsive tasarım
- Dinamik carousel (Son 10 haber)
- Kategori filtreleme
- Glassmorphism tasarım efektleri
- Font Awesome ikonları

### 📚 API Dokümantasyonu
- Swagger UI entegrasyonu
- Tüm endpoint'ler dokümante edilmiş
- Erişim: `http://localhost:3000/api-docs`

### 🔧 Teknik Özellikler
- TypeScript ile tip güvenliği
- express-validator ile validation
- Global error handler
- Merkezi loglama
- Session yönetimi
- File upload (Multer)
- MongoDB indexleme

---

## 📦 Kurulum

### Gereksinimler
- Node.js (v18+)
- MongoDB (v6+)
- npm veya yarn

### 1. Projeyi İndirin
```bash
git clone https://github.com/your-username/newshub.git
cd newshub
```

### 2. Bağımlılıkları Kurun
```bash
npm install
```

### 3. Ortam Değişkenlerini Ayarlayın
`.env` dosyası oluşturun ve aşağıdaki değişkenleri ekleyin:

```env
# Server Configuration
PORT=3000
NODE_ENV=development

# Database Configuration
MONGODB_URI=mongodb://localhost:27017
DB_NAME=newshub

# Crypto Configuration (Şifreleme için)
CRYPTO_SECRET_KEY=UFYC634V78J6XI788G51K9444KL03637

# JWT Configuration (Token için)
JWT_SECRET=A7B9D4F2E8C1G5H3J6K8L0M9N2P4Q7R1S3T5U8V0W2X4Y6Z9
JWT_EXPIRES_IN=7d
JWT_REFRESH_EXPIRES_IN=30d

# Session Configuration (EJS oturum yönetimi için)
SESSION_SECRET=B8C0E5G7I9K2M4O6Q8S1U3W5Y7Z9A2C4E6G8I0K2M4O6Q8S0
```

### 4. MongoDB'yi Başlatın
```bash
# Windows
mongod

# Mac/Linux
sudo systemctl start mongod
```

### 5. Uygulamayı Çalıştırın

#### Development Modu
```bash
npm run dev
```

#### Production Modu
```bash
npm run build
npm start
```

Uygulama çalıştıktan sonra:
- **Frontend:** http://localhost:3000
- **API Docs:** http://localhost:3000/api-docs

---

## 📁 Proje Yapısı

```
NewsHub/
├── src/
│   ├── config/
│   │   ├── db.ts              # MongoDB bağlantısı
│   │   ├── cryptoJS.ts        # Şifreleme fonksiyonları
│   │   └── swagger.ts         # Swagger yapılandırması
│   ├── controllers/
│   │   ├── authController.ts  # Kimlik doğrulama
│   │   ├── newsController.ts  # Haber işlemleri
│   │   ├── commentController.ts # Yorum işlemleri
│   │   └── adminController.ts # Admin işlemleri
│   ├── middlewares/
│   │   ├── authMiddleware.ts  # JWT doğrulama
│   │   ├── sessionAuthMiddleware.ts # Session doğrulama
│   │   ├── roleMiddleware.ts  # Rol kontrolü
│   │   ├── uploadMiddleware.ts # Dosya yükleme
│   │   └── errorHandler.ts    # Global hata yönetimi
│   ├── models/
│   │   ├── userModel.ts       # Kullanıcı şeması
│   │   ├── newsModel.ts       # Haber şeması
│   │   ├── commentModel.ts    # Yorum şeması
│   │   └── result.ts          # Response şablonu
│   ├── routes/
│   │   ├── authRoutes.ts      # Auth endpoint'leri
│   │   ├── newsRoutes.ts      # News endpoint'leri
│   │   ├── commentRoutes.ts   # Comment endpoint'leri
│   │   ├── adminRoutes.ts     # Admin endpoint'leri
│   │   └── viewRoutes.ts      # View (EJS) route'ları
│   ├── utils/
│   │   ├── jwtUtility.ts      # JWT fonksiyonları
│   │   ├── eRoles.ts          # Rol enum'ları
│   │   └── AppError.ts        # Custom error sınıfları
│   ├── validations/
│   │   ├── authValidator.ts   # Auth validation
│   │   ├── newsValidator.ts   # News validation
│   │   ├── commentValidator.ts # Comment validation
│   │   └── index.ts           # Validation middleware
│   ├── app.ts                 # Express app yapılandırması
│   └── server.ts              # Server başlatma
├── views/
│   ├── layouts/
│   │   └── main.ejs           # Ana layout
│   ├── partials/
│   │   ├── header.ejs         # Header
│   │   ├── footer.ejs         # Footer
│   │   └── flash.ejs          # Flash mesajları
│   ├── pages/
│   │   ├── home.ejs           # Ana sayfa
│   │   ├── login.ejs          # Giriş
│   │   ├── register.ejs       # Kayıt
│   │   ├── profile.ejs        # Profil
│   │   ├── news-detail.ejs    # Haber detay
│   │   ├── create-news.ejs    # Haber oluştur
│   │   ├── my-news.ejs        # Haberlerim
│   │   └── admin.ejs          # Admin paneli
│   └── errors/
│       ├── 404.ejs            # 404 sayfası
│       ├── 403.ejs            # 403 sayfası
│       └── 500.ejs            # 500 sayfası
├── public/
│   ├── css/
│   │   └── style.css          # Custom CSS
│   ├── js/
│   │   └── app.js             # Client-side JS
│   └── images/                # Statik görseller
├── uploads/                   # Yüklenen dosyalar
├── .env                       # Ortam değişkenleri
├── package.json
├── tsconfig.json
└── README.md
```

---

## 🔗 API Endpoint'leri

### Authentication (`/api/auth`)
| Metod | Endpoint | Açıklama | Yetki |
|-------|----------|----------|-------|
| POST | `/register` | Kullanıcı kaydı | Public |
| POST | `/login` | Kullanıcı girişi | Public |
| POST | `/refresh` | Token yenileme | Public |
| GET | `/profile` | Profil bilgileri | JWT |

### News (`/api/news`)
| Metod | Endpoint | Açıklama | Yetki |
|-------|----------|----------|-------|
| GET | `/` | Tüm haberleri listele | Public |
| GET | `/:id` | Haber detayı | Public |
| GET | `/my/news` | Kendi haberlerim | JWT |
| POST | `/` | Yeni haber oluştur | JWT + Role |
| PUT | `/:id` | Haber güncelle | JWT + Owner |
| DELETE | `/:id` | Haber sil | JWT + Owner |

### Comments (`/api/comments`)
| Metod | Endpoint | Açıklama | Yetki |
|-------|----------|----------|-------|
| GET | `/news/:newsId` | Haberin yorumları | Public |
| GET | `/my-comments` | Kendi yorumlarım | JWT |
| POST | `/news/:newsId` | Yorum ekle | JWT |
| PUT | `/:id` | Yorum güncelle | JWT + Owner |
| DELETE | `/:id` | Yorum sil | JWT + Admin/Owner |

### Admin (`/api/admin`)
| Metod | Endpoint | Açıklama | Yetki |
|-------|----------|----------|-------|
| GET | `/dashboard` | Dashboard istatistikleri | Admin |
| GET | `/users` | Tüm kullanıcılar | Admin |
| DELETE | `/users/:id` | Kullanıcı sil | Admin |
| PUT | `/users/:id/role` | Rol güncelle | Admin |
| GET | `/news` | Tüm haberler | Admin |
| DELETE | `/news/:id` | Haber sil | Admin |

---

## 🎯 Frontend Sayfaları

| Sayfa | URL | Açıklama |
|-------|-----|----------|
| Ana Sayfa | `/` | Haber listesi, carousel, filtreleme |
| Giriş | `/login` | Kullanıcı girişi |
| Kayıt | `/register` | Yeni kullanıcı kaydı |
| Profil | `/profile` | Kullanıcı profili |
| Haber Detay | `/news/:id` | Haber içeriği ve yorumlar |
| Haber Oluştur | `/news/create` | Yeni haber ekle (Mod+) |
| Haberlerim | `/my-news` | Kendi haberlerim |
| Admin Panel | `/admin` | Yönetim paneli (Admin) |

---

## 🔒 Roller ve Yetkiler

### User (Kullanıcı)
- Kayıt olabilir
- Giriş yapabilir
- Haber okuyabilir
- Yorum yapabilir
- Kendi yorumlarını silebilir

### Moderator (Moderatör)
- User yetkilerine ek olarak:
- Haber oluşturabilir
- Kendi haberlerini düzenleyebilir
- Kendi haberlerini silebilir

### Admin (Yönetici)
- Tüm yetkilere sahiptir
- Tüm kullanıcıları yönetebilir
- Tüm haberleri silebilir
- Kullanıcı rollerini değiştirebilir
- Tüm yorumları silebilir

---

## 🧪 Test

```bash
# Tüm testleri çalıştır
npm test

# Test coverage
npm run test:coverage
```

---

## 📝 Geliştirme Notları

### Validation
- Tüm input'lar `express-validator` ile doğrulanır
- Validation hataları merkezi olarak yönetilir

### Hata Yönetimi
- Global error handler
- Custom error sınıfları
- Development/Production ortamına göre farklı response'lar

### Güvenlik
- JWT token doğrulama
- Session management
- Rate limiting (opsiyonel)
- Helmet.js (opsiyonel)
- CORS yapılandırması

### Performance
- MongoDB indexleme
- Pagination
- Lazy loading (frontend)

---

## 📊 MongoDB Koleksiyonları

### users
```javascript
{
  _id: ObjectId,
  name: String (3-50 karakter),
  email: String (unique, lowercase),
  password: String (encrypted),
  role: Enum ['User', 'Moderator', 'Admin'],
  createdAt: Date,
  updatedAt: Date
}
```

### news
```javascript
{
  _id: ObjectId,
  title: String (10-200 karakter),
  content: String (50-10000 karakter),
  category: Enum,
  slug: String (unique),
  image: String (URL),
  author: ObjectId (ref: User),
  views: Number (default: 0),
  createdAt: Date,
  updatedAt: Date
}
```

### comments
```javascript
{
  _id: ObjectId,
  content: String (1-1000 karakter),
  author: ObjectId (ref: User),
  news: ObjectId (ref: News),
  createdAt: Date,
  updatedAt: Date
}
```

---

## 🤝 Katkıda Bulunma

1. Fork yapın
2. Feature branch oluşturun (`git checkout -b feature/AmazingFeature`)
3. Commit yapın (`git commit -m 'Add some AmazingFeature'`)
4. Push edin (`git push origin feature/AmazingFeature`)
5. Pull Request oluşturun

---

## 📄 Lisans

Bu proje MIT lisansı altında lisanslanmıştır.

---


- [Node.js](https://nodejs.org/)
- [Express.js](https://expressjs.com/)
- [MongoDB](https://www.mongodb.com/)
- [TypeScript](https://www.typescriptlang.org/)
- [Bootstrap](https://getbootstrap.com/)
- [Swagger](https://swagger.io/)

---