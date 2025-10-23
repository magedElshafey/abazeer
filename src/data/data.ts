// types
import type { Nav } from "../types/Nav";
import type { Lang } from "../types/Lang";
import { Shippings } from "@/features/checkout/types/shipping.types";
import { Payment } from "@/features/checkout/types/payment.type";

export const navLinks: Nav[] = [
  {
    name: "offers",
    link: "/products?filter-in_offer=true",
  },
  {
    name: "About",
    link: "/about-us",
  },

  {
    name: "blogs",
    link: "/blogs",
  },
  {
    name: "products",
    link: "/products",
  },
  {
    name: "faq",
    link: "/faq",
  },
];

export const protectedRoutes: string[] = [
  "/cart",
  "/checkout",
  "/payment",
  "/my-profile",
  "/my-wishlist",
  "/my-addresses",
  "/dashboard",
];

export const useflulLinks: Nav[] = [
  {
    name: "terms of use",
    link: "/terms-of-use",
  },
  {
    name: "terms & conditions",
    link: "/terms-conditions",
  },
  {
    name: "refund policy",
    link: "/refund-policy",
  },
  {
    name: "faq",
    link: "/faq",
  },
];
export const helpCenterLinks: Nav[] = [
  {
    name: "About",
    link: "/about",
  },

  {
    name: "blogs",
    link: "/refund-policy",
  },
];
export const myAccount: Nav[] = [
  {
    name: "my whishlist",
    link: "/my-profile/favorites",
  },
  {
    name: "my addresses",
    link: "my-profile/addresses",
  },
  {
    name: "my profile",
    link: "/my-profile/settings",
  },
  {
    name: "orders",
    link: "/my-profile/orders",
  },
];
export const LANGUAGES: Lang[] = [
  { flag: "/images/us.png", title: "english", label: "en" },
  { flag: "/images/ksa.png", title: "arabic", label: "ar" },
];
export const paymentMethods: Payment[] = [
  {
    id: 1,
    title: "cash on delivery (COD)",
    descreption:
      "Please pay money directly to the postman, if you choose cash on delivery method (COD).",
    image: "/images/code.png",
    type: "cash_on_delivery",
  },
];
