export type Product = {
  brand: string;
  category: string;
  description: string;
  discountPercentage: number;
  id: number;
  images: string[];
  price: number;
  rating: number;
  stock: number;
  thumbnail: string;
  title: string;
};

export interface Elements {
  [key: string]: HTMLElement;
}

export type ApiResponse = {
  products: Product[];
  limit: number;
  skip: number;
  total: number;
};
