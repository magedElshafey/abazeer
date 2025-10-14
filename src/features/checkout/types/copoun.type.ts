import { Category } from "@/features/categories/types/category.types";
import { Product } from "@/features/products/types/product.types";

export interface Copoun {
  id: number;
  code: string;
  title: string;
  description: string;
  value: string;
  type_option: "percentage" | "fixed";
  target: string;
  min_order_price: string;
  start_date: string;
  end_date: string;
  quantity: number;
  total_used: number;
  is_active: number;
  left_quantity: number;
  can_use_with_promotion: boolean;
  can_use_with_flash_sale: boolean;
  apply_via_url: boolean;
  display_at_checkout: boolean;
  is_expired: boolean;
  products: Product[];
  categories: Category[];
}
