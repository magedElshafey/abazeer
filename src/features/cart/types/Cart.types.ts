import { Product } from "@/features/products/types/product.types";

export interface CartItem extends Product {
  quantity: number;
  item_id: number;
  isLoading?: boolean;
  subtotal?: string;
  product_id?: number;
}

export interface CartResponse {
  id: number;
  items: CartItem[];
  total: string;
  out_of_stock_items: number[];
}
