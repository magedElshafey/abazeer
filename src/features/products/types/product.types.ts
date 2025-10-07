export interface ProductType {
  id: number;
  category: string;
  name: string;
  price: string;
  image: string | null;
  has_discount: boolean;
  discount_percentage: number;
  average_rate: number;
  ratings_count: number;
  stock_quantity: number;
  sold_quantity: number | null;
  sale_price?: number;
  quantity: number;
}
