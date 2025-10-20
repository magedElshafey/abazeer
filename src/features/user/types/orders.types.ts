import { NameAndId } from "@/types/global.types";
import { Address } from "./addresses.types";
import { Product } from "@/features/products/types/product.types";

export interface Order {
    id: number;
    user_id: NameAndId;
    address: Address;
    subtotal: string;
    shipping: string;
    tax: string;
    discount: string;
    total: string;
    coupon_code: string | null;
    coupon: unknown | null;
    payment_method: string | null;
    payment_status: string;
    order_status: string;
    order_status_label: string;
    order_number: string;
    notes: string;
    created_at: string;
}

export interface OrderItem {
    id: number;
    quantity: number;
    price: string;
    total: string;
    product_attribute_id: number | null;
    product: Product;
    created_at: string;
}

export interface OrderDetails extends Order {
    order_items: OrderItem[];
    invoice: string | null;
}

