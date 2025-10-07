import type { Category } from "@/features/categories/types/category.types";
import type { Brand } from "@/features/brands/types/brand.types";
import type { Review } from "./review.types";

export interface Product {
  id: number;
  category: string;
  name: string;
  image: string | null;
  has_discount: boolean;
  discount_percentage: number;
  price: string;
  average_rate: number;
  ratings_count: number;
  stock_quantity: number;
  sold_quantity: number | null;
  sale_price: number;
  quantity: number;
}

export interface Dimensions {
  length: number;
  width: number;
  height: number;
}

export interface ProductDetails extends Omit<Product, "category"> {
  id: number;
  name: string;
  description: string;
  short_description: string;
  slug: string;
  featured: boolean;
  in_offer: boolean;
  status: string;
  is_active: boolean;
  price: string;
  stock_quantity: number;
  security_stock: number;
  model_number: string;
  expired_at: string;
  stock_status: string;
  weight: string;
  dimensions: Dimensions;
  meta_title: string;
  meta_description: string;
  average_rate: number;
  is_best_seller: boolean;
  sold_number: number;
  related_products_data: Product[];
  created_at: string;
  brand: Brand;
  category: Category;
  reviews: Review[];
  images: string[];
  has_discount: boolean;
  quantity: number;
}
