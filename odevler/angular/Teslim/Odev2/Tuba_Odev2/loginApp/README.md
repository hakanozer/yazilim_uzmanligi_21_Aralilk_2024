# Angular Product Catalog App

Bu proje, Angular kullanılarak geliştirilmiş bir ürün katalog uygulamasıdır. [DummyJSON API](https://dummyjson.com/products) üzerinden alınan verilerle ürünler listelenmekte ve her ürünün detay sayfası görüntülenebilmektedir.

## 🎯 Proje Amacı

- Ürünleri listeleyen bir sayfa oluşturmak,
- Her ürün kartında **resim**, **başlık** ve **fiyat** göstermek,
- Seçilen ürünün detay sayfasında tüm bilgilerini sunmak,
- Angular ile API tüketimi ve routing işlemlerini uygulamak.

## 🔧 Kullanılan Teknolojiler

- Angular 20.1.0 9
- TypeScript
- HTML & CSS 
- DummyJSON API

## 🔗 API Kaynakları

- Ürün Listesi: `https://dummyjson.com/products`
- Ürün Detayı: `https://dummyjson.com/products/{id}`

## 📸 Ekran Görüntüleri

### 🖼️ Product Detail

<img width="958" height="512" alt="image" src="https://github.com/user-attachments/assets/f37bd9e4-881c-423f-b94d-489346b0c01e" />

<img width="333" height="721" alt="product-detail" src="https://github.com/user-attachments/assets/ff660823-97cf-4041-bc1a-33b3ce477fb5" />

### 🎥 Products (Video)

[products-detail.webm](https://github.com/user-attachments/assets/3d9ff8d0-c6d6-4123-a872-5b74a12142bb)


## 🧭 Uygulama Özellikleri

### 🔹 Ürün Listesi Sayfası
API'den alınan ürünler gösterilir.

Her ürün kartında:
Ürün görseli
Ürün başlığı
Fiyat

### 🔹 Ürün Detay Sayfası
Seçilen ürünün detayları gösterilir.

###🔹 Detay sayfasında yer alan bilgiler:
Resim
Başlık
Açıklama
Fiyat
Marka
Kategori

---

## 🗂️ Proje Yapısı (Özet)
src/
---
│
├── app/
│   ├── components/
│   │   ├── product-item/        → Ürün bileşeni
│   │   └── product-detail/      → Ürün detay bileşeni
│   ├── services/
│   │   └── api.ts       → API iletişimi
│   ├── models/
│   │   └── IProducts.ts         → Ürün modelleri
│   └── app-routing.ts    → Sayfalar arası yönlendirme
│
├── assets/
└── index.html
---


---
## 🧪 Örnek API Yanıtı

```json
{
  "id": 1,
  "title": "iPhone 13",
  "description": "An apple mobile which is nothing like apple",
  "price": 549,
  "discountPercentage": 12.96,
  "rating": 4.69,
  "stock": 94,
  "brand": "Apple",
  "category": "smartphones",
  "thumbnail": "https://cdn.dummyjson.com/product-images/1/thumbnail.jpg"
}


