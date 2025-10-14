export interface Setting {
  site_name: string;
  site_description: string;
  site_logo: string | null;
  contact_email: string;
  contact_phone: string;
  contact_address: string;
  social_facebook: string | null;
  social_twitter: string | null;
  social_instagram: string | null;
  site_maintenance: boolean;
  slogan?: string;
  fav_icon: string | null;
  site_description_ar: string | null;
  hot_line: string;
}

export interface Feature {
  id: number;
  name: string;
  description: string;
  image: string;
  is_active: boolean;
  created_at: string;
}