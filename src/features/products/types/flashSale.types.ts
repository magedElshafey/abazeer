import { Product } from "./product.types";

export interface Flashsale {
  start_date: string;
  end_date: string;
  products: Product[];
}
