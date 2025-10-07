import { ProductType } from "@/features/products/types/product.types";

export interface CartItem extends ProductType {
  quantity: number;
}

export interface CartResponse {
  id: number;
  items: ProductType[];
  total: string;
}
