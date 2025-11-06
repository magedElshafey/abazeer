export interface NotificationData {
  product_id?: number;
  slug?: string;
  type?: string;
  order_id?: number | null;
}

export interface Notification {
  id: string;
  type: string;
  data: {
    title: string;
    body: string;
    data: NotificationData;
  };
  read_at: string | null;
  created_at: string;
}

