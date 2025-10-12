# TeamTask
Rol Tabanlı Proje Yönetim Sistemi - Rest Servisi

## 📋 Özellikler
- ✅ Task CRUD işlemleri
- ✅ Status yönetimi (pending, in-progress, completed)
- ✅ Öncelik seviyeleri (low, medium, high)
- ✅ TypeScript desteği
- ✅ MongoDB veritabanı
- ✅ RESTful API

## 🚀 Kurulum

### 1. Projeyi Klonlayın
```bash
git clone https://github.com/caglarkizilaslan/TeamTask.git
cd TeamTask
```

### 2. Bağımlılıkları Kurun
```bash
npm install
```

### 3. Environment Ayarları
`.env.example` dosyasını `.env` olarak kopyalayın:

**Windows:**
```bash
copy .env.example .env
```

**Linux/Mac:**
```bash
cp .env.example .env
```

Ardından `.env` dosyasındaki değerleri düzenleyin.

### 4. MongoDB'yi Başlatın
```bash
# MongoDB'nin çalıştığından emin olun
# Varsayılan: mongodb://localhost:27017
```

### 5. Projeyi Çalıştırın

**Development Mode:**
```bash
npm run dev
```

**Production Mode:**
```bash
npm run build
npm start
```

## 📚 API Endpoints

### Tasks
- `POST /api/tasks` - Yeni görev oluştur
- `GET /api/tasks` - Tüm görevleri listele
- `GET /api/tasks/:id` - Tek görev detayı
- `PUT /api/tasks/:id` - Görev güncelle
- `DELETE /api/tasks/:id` - Görev sil
- `PATCH /api/tasks/:id/status` - Görev durumu güncelle

## 🛠️ Teknolojiler
- Node.js
- TypeScript
- Express.js
- MongoDB + Mongoose
- JWT Authentication
- Jest (Testing)

## 👥 Ekip Üyeleri
- [Ekip üyelerinin isimleri]

## 📝 Lisans
ISC
