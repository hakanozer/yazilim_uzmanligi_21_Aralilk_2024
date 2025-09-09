# 🛍️ Product Catalog Application

**Product Catalog Application**, C# dili ve MongoDB veritabanı kullanılarak geliştirilmiş, konsol tabanlı bir uygulamadır. Bu proje, kullanıcıların ürün ve kategori bilgilerini yönetebileceği, gelişmiş filtreleme ve sayfalama işlemleri gerçekleştirebileceği bir katalog sistemini kapsamaktadır. Aynı zamanda uygulama, hata yönetimini sağlayan bir loglama altyapısına da sahiptir.

---

## 🎯 Projenin Amacı

Bu projenin temel amacı, C# programlama dili ve MongoDB veritabanını entegre bir yapıda kullanarak veri yönetimi, hata kontrolü, filtreleme ve kullanıcı dostu veri erişimi gibi temel yetkinlikleri kazandırmaktır.

Uygulama sayesinde:
- Yeni ürün ve kategori ekleyebilir,
- Mevcut verileri güncelleyebilir veya silebilir,
- Ürünleri çeşitli kriterlere göre arayabilir ve filtreleyebilir,
- Tüm hata kayıtlarını log dosyasına yazabilir ve bu kayıtları sorgulayabilirsiniz.

---

## 🛠️ Kullanılan Teknolojiler

| Teknoloji | Açıklama |
|-----------|----------|
| **C# (.NET 9 / .NET Core)** | Konsol uygulaması geliştirmek için kullanılan ana programlama dili |
| **MongoDB** | NoSQL veritabanı yönetim sistemi |
| **MongoDB.Driver** | MongoDB ile C# uygulamasını entegre eden NuGet paketi |
| **Katmanlı Mimari** | Uygulama iş mantığını (Services), veritabanı erişimini (Utils) ve veri modellerini (Models) ayrı katmanlarda toplar |
| **Loglama** | Hatalar `hata_log.txt` dosyasına kaydedilir |

---

## 🧩 Uygulama Özellikleri

### 📦 Ürün İşlemleri
- Ürün ekleme
- Ürün güncelleme
- Ürün silme
- Ürün listeleme (sayfalama ile)
- Ürün arama (isim ve açıklama üzerinden)
- Ürün filtreleme (fiyat aralığına ve kategoriye göre)


### 📁 Kategori İşlemleri
- Kategori ekleme
- Kategori güncelleme
- Kategori silme (ilişkili ürün varsa uyarı verir)
- Kategori listeleme

### 📜 Hata Yönetimi
- Tüm hatalar `hata_log.txt` dosyasına yazılır
- Loglar zaman ve içerik bazlı sorgulanabilir


<img width="683" alt="loglama" src="https://github.com/user-attachments/assets/4aab67e8-ac69-4aee-8bb4-a4eb4bb845f9" />

---

<img width="269" alt="Ekran görüntüsü 2025-05-23 221627" src="https://github.com/user-attachments/assets/1939bd89-eaa8-4818-86c4-59abd95900f8" />

<img width="262" alt="Ekran görüntüsü 2025-05-23 221556" src="https://github.com/user-attachments/assets/94130876-79a5-4236-87a8-1dc6ae83ad1f" />

<img width="274" alt="Ekran görüntüsü 2025-05-23 221659" src="https://github.com/user-attachments/assets/bef47625-948b-4914-b46b-84051a6ef791" />

<img width="262" alt="Ekran görüntüsü 2025-05-23 222754" src="https://github.com/user-attachments/assets/8e7d0ecf-0771-4a2b-9b57-f97326b71a9b" />

<img width="258" alt="Ekran görüntüsü 2025-05-23 222726" src="https://github.com/user-attachments/assets/e1de40cb-3c4d-4009-a575-2fa8fa1396f4" />


---


## 🗂️ Proje Yapısı


ProductCatalogApp/
---
│
---
├── Models/
---
│ ├── Product.cs --> Ürün veri modeli
---
│ └── Category.cs --> Kategori veri modeli
---
│
---
├── Services/
---
│ ├── ProductService.cs --> Ürün CRUD işlemleri
---
│ └── CategoryService.cs --> Kategori CRUD işlemleri
---
│
---
├── Utils/
---
│ ├── DatabaseContext.cs --> MongoDB bağlantısı
---
│ └── Logger.cs --> Hata loglama işlemleri
---
│
---
├── hata_log.txt --> Log kayıt dosyası
---
└── Program.cs --> Uygulama başlangıç noktası (menü)
---


<img width="960" alt="Ekran görüntüsü 2025-05-23 222836" src="https://github.com/user-attachments/assets/c6a6549a-7416-4349-8370-67ae3ea326c3" />

<img width="960" alt="Ekran görüntüsü 2025-05-23 222853" src="https://github.com/user-attachments/assets/e5b35832-eeb0-4a5e-bad8-3fef73a7e5a3" />


---


## ⚙️ Kurulum ve Kullanım

1. Projeyi klonlayın:
   ```bash
   git clone https://github.com/tubanursmsk/ProductCatalogApp.git
   cd ProductCatalogApp
   
2. NuGet paketlerini yükleyin:
   ```bash
   dotnet restore

3. MongoDB bağlantınızı DatabaseContext.cs içinde ayarlayın. Örneğin:
   ```bash
   var client = new MongoClient("mongodb://localhost:27017");
   var database = client.GetDatabase("ProductCatalogDB");
   
4. Uygulamayı başlatın:
   ```bash
   dotnet run

---


## 🔎 Örnek Kullanım Akışı
Menüden "Kategori Ekle" seçilir → kategori adı girilir → eklenir.

"Ürün Ekle" seçilir → ilgili alanlar doldurulur → kategori ID'si girilir → ürün veritabanına eklenir.

"Ürün Listele" seçilir → 10’luk sayfalama ile listelenir.

"Ürün Ara" → örneğin "laptop" kelimesi girilir → eşleşen ürünler görüntülenir.

Hatalı giriş yapılırsa → log dosyasına yazılır ve kullanıcıya açıklayıcı mesaj döner.










