import { Product } from "@/features/products/types/product.types";

export interface CartItem extends Product {
  quantity: number;
  item_id: number;
  isLoading?: boolean;
  subtotal?: string;
}

export interface CartResponse {
  id: number;
  items: CartItem[];
  total: string;
}
