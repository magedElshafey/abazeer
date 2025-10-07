export interface Category {
  id: number;
  name: string;
  description: string;
  image: string | null;
  slug: string;
  is_active: boolean;
  sort_order: number;
  created_at: string;
  updated_at: string;
}

