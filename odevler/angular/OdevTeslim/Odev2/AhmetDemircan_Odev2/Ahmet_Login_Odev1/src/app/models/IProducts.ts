export interface IDimensions {
  width: number;
  height: number;
  depth: number;
}

export interface ISingleproduct
{
  meta: IMeta,
  data: IProduct,
  total: number,
  skip: number,
  limit: number;
}

export interface IReview {
  rating: number;
  comment: string;
  date: string; // ISO date string
  reviewerName: string;
  reviewerEmail: string;
}

export interface IMeta {
  createdAt: string; // ISO date string
  updatedAt: string; // ISO date string
  barcode: string;
  qrCode: string;
}

export interface IProduct {
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
  dimensions: IDimensions;
  warrantyInformation: string;
  shippingInformation: string;
  availabilityStatus: string;
  reviews: IReview[];
  returnPolicy: string;
  minimumOrderQuantity: number;
  meta: IMeta;
  thumbnail: string;
  images: string[];
}

export interface IProducts {
  products: IProduct[];
  total: number;
  skip: number;
  limit: number;
}
