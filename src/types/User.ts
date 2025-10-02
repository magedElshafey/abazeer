export interface User {
  id?: number;
  name: string;
  email: string;
  mobile?: string;
  lang?: string;
  access_token?: string;
  active?: boolean;
  balance?: number;
  field: string;
  licenses: { id: number; url: string; type: string }[];
  bank_account?: string | null;
  count_unread_notifications?: number;
  created_at?: string;
  image?: string;
  type?: string;
  notify?: boolean;
  has_subscription?: boolean;
  role: string;
}
