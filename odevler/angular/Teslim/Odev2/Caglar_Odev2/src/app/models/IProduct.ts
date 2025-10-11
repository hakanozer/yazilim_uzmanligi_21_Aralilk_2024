// 1. Ürün İncelemesi (Review) için Interface - Adı IReview olarak değiştirildi
export interface IReview {
  rating: number;
  comment: string;
  date: string;
  reviewerName: string;
  reviewerEmail: string;
}

// 2. Boyutlar (Dimensions) için Interface - İsimlendirme kuralına göre IDimensions veya sadece Dimensions
export interface IDimensions { // İstersen sadece "Dimensions" da olabilir
  width: number;
  height: number;
  depth: number;
}

// 3. Meta Bilgileri için Interface - İsimlendirme kuralına göre IMeta veya sadece Meta
export interface IMeta { // İstersen sadece "Meta" da olabilir
  createdAt: string;
  updatedAt: string;
  barcode: string;
  qrCode: string;
}

// 4. Tek Bir Ürün (Product) için Interface - Adı IProduct olarak düzeltildi ve doğru tip referansları kullanıldı
export interface IProduct { // Bu artık tek bir ürünü temsil ediyor
  id: number;
  title: string;
  description: string;
  category: string;
  price: number;
  discountPercentage: number;
  rating: number;
  stock: number;
  tags: string[];
  brand: string;
  sku: string;
  weight: number;
  dimensions: IDimensions; // IDimensions interface'ini kullanıyoruz
  warrantyInformation: string;
  shippingInformation: string;
  availabilityStatus: string;
  reviews: IReview[]; // IReview interface'lerinden oluşan bir dizi kullanıyoruz
  returnPolicy: string;
  minimumOrderQuantity: number;
  meta: IMeta; // IMeta interface'ini kullanıyoruz
  thumbnail: string;
  images: string[];
}

// 5. Ana Cevap Yapısı (ProductResponse) için Interface - IProductResponse olarak adlandırıldı
export interface IProductResponse { // Bu, API'den dönecek olan en dıştaki nesnenin yapısıdır.
  products: IProduct[]; // IProduct interface'lerinden oluşan bir dizi kullanıyoruz
  total: number;
  skip: number;
  limit: number;
}