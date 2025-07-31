export interface IProductResponse {
  products: IProduct[];
  total: number;
  skip: number;
  limit: number;
}

export interface IProduct {
  id: number;
  title: string;
  description: string;
  category: string;
  price: number;
  rating: number;
  stock: number;
  tags: string[];
  brand: string;
  weight: number;
  dimensions: IDimensions;
  images: string[];
  thumbnail: string;
}

export interface IDimensions {
  width: number;
  height: number;
  depth: number;
}



