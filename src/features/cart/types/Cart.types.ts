import { Product } from "@/features/products/types/product.types";

export interface CartItem extends Product {
  quantity: number;
}

export interface CartResponse {
  id: number;
  items: Product[];
  total: string;
}
