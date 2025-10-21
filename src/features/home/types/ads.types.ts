export interface Ads {
  id: number;
  category_id: number;
  category: {
    id: number;
    name: string;
  };
  image: string;
  is_active: boolean;
  created_at: string;
}
