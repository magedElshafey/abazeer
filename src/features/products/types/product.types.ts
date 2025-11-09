import type { Category } from "@/features/categories/types/category.types";
import type { Brand } from "@/features/brands/types/brand.types";
import type { Review } from "./review.types";
import { sortableKeys } from "../constants/products.constants";

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
  is_in_wishlist: boolean;
  category_id: number;
}

export interface Dimensions {
  length: number;
  width: number;
  height: number;
}

export interface ProductProperty {
  id: number;
  name: string;
  image: string | null;
  is_active: boolean;
  created_at: string;
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
  is_in_wishlist: boolean;
  created_at: string;
  brand: Brand;
  category: Category;
  reviews: Review[];
  images: string[];
  has_discount: boolean;
  quantity: number;
  long_description: string;
  properties: ProductProperty[];
}

type SortByKey<T> = T extends string ? `${T}-asc` | `${T}-desc` : never;

export interface Filters {
  price_from?: string;
  price_to?: string;
  category?: string;
  brand?: string[];
  has_discount?: string;
  in_offer?: string;
}

export interface ProductsFiltersContext {
  sortBy?: SortByKey<(typeof sortableKeys)[number]>;
  filters: Filters;
  isDrawerOpen: boolean;
  setSortBy: (sortBy: ProductsFiltersContext["sortBy"]) => void;
  setIsDrawerOpen: (isOpen: boolean) => void;
  handleChangeFilters: (
    key: keyof Filters,
    value: Filters[typeof key],
    debounce?: boolean
  ) => void;
  resetFilters: () => void;
  appliedFilters: Record<string, string | []>;
}

export interface ProductsViewContext {
  view: "list" | "cards";
  setView: (view: ProductsViewContext["view"]) => void;
}

// Legacy interface for backward compatibility if needed
export interface ProductsContext
  extends ProductsFiltersContext,
    ProductsViewContext {}
