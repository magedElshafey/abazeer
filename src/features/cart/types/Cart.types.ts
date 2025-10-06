export interface CartItem {
  id: number;
  title: string;
  image: string;
  price: number;
  quantity: number;
}

export interface CartResponse {
  items: CartItem[];
  total: number;
}
