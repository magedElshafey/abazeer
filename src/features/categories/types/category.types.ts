export interface BaseCategory {
  id: number;
  name: string;
  slug: string;
  image?: string | null;
  icon?: string;
}

export interface Category extends BaseCategory {
  description: string;
  is_active: boolean;
  sort_order: number;
  created_at: string;
  updated_at: string;
}

export interface CategoriesListType extends BaseCategory {
  children?: CategoriesListType[];
}
