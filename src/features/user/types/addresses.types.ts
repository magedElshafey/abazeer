export interface Address {
  id: number;
  name: string;
  city: string;
  country: string;
  address: string;
  phone?: string;
  postal_code?: string;
  is_default?: boolean;
}
