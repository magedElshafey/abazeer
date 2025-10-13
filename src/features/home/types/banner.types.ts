export interface HomeBanner {
  id: number;
  is_active: boolean;
  description: string;
  media_type: string;
  image: string;
  video: string | null;
  created_at: string;
  updated_at: string;
}
