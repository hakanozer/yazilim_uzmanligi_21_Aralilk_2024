# 🧩 TeamTask

**Proje Yönetim ve Takip Sistemi (RESTful API)**  
Bu proje, ekiplerin projelerini ve görevlerini yönetebilmesi için geliştirilmiş, **Node.js (Express)** ve **TypeScript** tabanlı bir REST API uygulamasıdır.  
Kullanıcı rolleri (Admin, Project Manager, Developer) bazında yetkilendirme yapılmakta, JWT ile kimlik doğrulama sağlanmaktadır.  

---

## 🚀 Özellikler

✅ Kimlik doğrulama (JWT Authentication)  
✅ Rol tabanlı erişim kontrolü (Admin / ProjectManager / Developer)  
✅ Proje yönetimi (oluşturma, güncelleme, silme, listeleme, arama)  
✅ Görev yönetimi (proje altına görev ekleme, durum güncelleme, listeleme)  
✅ Kullanıcı yönetimi  
✅ Swagger ile API dokümantasyonu  
✅ Mongoose üzerinden MongoDB bağlantısı  
✅ Modüler servis yapısı ile temiz kod mimarisi  

---

## 🛠️ Kullanılan Teknolojiler

| Teknoloji | Açıklama |
|------------|-----------|
| **Node.js** | Sunucu tarafı çalıştırma ortamı |
| **Express.js** | REST API framework’ü |
| **TypeScript** | Tip güvenliği ve gelişmiş yapı |
| **MongoDB (Mongoose)** | NoSQL veritabanı |
| **JWT (jsonwebtoken)** | Kimlik doğrulama |
| **bcrypt** | Parola hashleme |
| **dotenv** | Ortam değişkenleri yönetimi |
| **Swagger UI** | API dokümantasyonu |
| **Nodemon / ts-node-dev** | Geliştirme ortamı otomatik yeniden başlatma |

---

## 📁 Proje Klasör Yapısı

```bash
TeamTask/
│
├── src/
│   ├── configs/
│   │   ├── auth.ts
│   │   ├── cryptoJS.ts
│   │   ├── db.ts
│   ├── models/
│   │   ├── projectModel.ts
│   │   ├── taskModel.ts
│   │   ├── userModel.ts
│   ├── controllers/
│   │   ├── projectRestController.ts
│   │   ├── taskRestController.ts
│   │   ├── userRestController.ts
│   ├── services/
│   │   ├── projectService.ts
│   │   ├── taskService.ts
│   │   ├── userService.ts
│   ├── utils/
│   │   ├── eRoles.ts
│   │   ├── swaggerOptions.ts
│   └── app.ts
├── package.json
├── tsconfig.json
├── .env
└── README.md
```

---

## 📁⚙️ Kurulum ve Çalıştırma

### Projeyi yerel ortamında çalıştırmak için aşağıdaki adımları izleyebilirsin:
1️⃣ Gerekli bağımlılıkları yükle

```bash
npm install
```

### 2️⃣ Ortam değişkenlerini ayarla
.env dosyası oluştur ve içerisine şunları ekle:
```bash
PORT=4000
SECRET_KEY=6c4402d3610ac417537497dbe8cf6370
```

### 3️⃣ Geliştirme modunda çalıştır
```
npm run dev
```

### 4️⃣ Üretim modunda derle ve çalıştır
```bash
npm run build
npm start
```

---

## 🧭 API Uç Noktaları (Örnekler)

### 🔐 Kimlik Doğrulama
POST /auth/register
POST /auth/login


### 👥 Kullanıcı Yönetimi
GET /users
GET /users/:id
PATCH /users/:id
DELETE /users/:id


### 📦 Proje Yönetimi
POST /projects
GET /projects
GET /projects/:id
PUT /projects/update/:id
DELETE /projects/delete/:id


### 🧠 Görev Yönetimi
POST /projects/:id/tasks
GET /projects/:id/tasks
PATCH /tasks/:id/status

---


## 📘 Swagger Dokümantasyonu
Uygulamayı başlattıktan sonra aşağıdaki adrese giderek Swagger arayüzünden API uç noktalarını inceleyebilirsin:
```bash
http://localhost:40000/api-docs
```

---


## 👥 Geliştirici Ekip

- **Ahmet Demircan**  
- **Mümine Muroğlu**
- **Serhat Ezen**
- **Tuba Nur Şimşek**  


---


🧾 Lisans

Bu proje eğitim amaçlı geliştirilmiştir.
Tüm hakları Ahmet Demircan, Mümine Muroğlu, Tuba Nur Şimşek, Serhat Ezen ekibine aittir.
© 2025 — TeamTask


