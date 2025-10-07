export interface Review {
  id: number;
  product: string;
  user: string;
  comment: string;
  rate: number;
  status: "pending" | "approved" | "rejected";
  is_active: boolean;
  created_at: string;
}

