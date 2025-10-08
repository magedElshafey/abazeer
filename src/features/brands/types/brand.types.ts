export interface Brand {
  id: number;
  name: string;
  is_active: boolean;
  sort_order: number;
  image: string | null;
  created_at: string;
  updated_at: string;
  slug: string;
  category: {
    id: number;
    name: string;
    slug: string;
  };
}
