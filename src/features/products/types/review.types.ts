export interface ReviewUser {
  id: number;
  name: string;
  image: string;
}

export interface Review {
  id: number;
  product: string;
  user: ReviewUser;
  comment: string;
  rate: number;
  status: "pending" | "approved" | "rejected";
  is_active: boolean;
  is_owner: boolean;
  created_at: string;
}

