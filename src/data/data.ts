// types
import type { Nav } from "../types/Nav";
import type { Feature } from "../common/layout/website/common/footer/components/features/type/Feature";
import type { Lang } from "../types/Lang";
// assets

// features
import feat1 from "../assets/feat-01.png";
import feat2 from "../assets/feat-02.png";
import feat3 from "../assets/feat-03.png";
import feat4 from "../assets/feat-04.png";
import feat5 from "../assets/feat-05.png";
// lang
import us from "../assets/us.png";
import ksa from "../assets/ksa.png";
import { Shippings } from "@/features/checkout/types/shipping.types";

export const navLinks: Nav[] = [
  {
    name: "offers",
    link: "/offers",
  },
  {
    name: "About",
    link: "/about-us",
  },

  // {
  //   name: "branches",
  //   link: "/branches",
  // },
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
  {
    name: "contact",
    link: "/contact-us",
  },
];
export const sidebarLinks: Nav[] = [
  {
    name: "offers",
    link: "/offers",
  },
  {
    name: "About",
    link: "/about-us",
  },
  // {
  //   name: "branches",
  //   link: "/branches",
  // },
  {
    name: "blogs",
    link: "/blogs",
  },
  {
    name: "faq",
    link: "/faq",
  },
  {
    name: "contact",
    link: "/contact-us",
  },
  {
    name: "order tracking",
    link: "/order-tracking",
  },
  {
    name: "compare",
    link: "/compare",
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

export const features: Feature[] = [
  {
    id: 1,
    image: feat1,
    title: "Free Shipping",
    description: "For all orders over $200",
  },
  {
    id: 2,
    image: feat2,
    title: "1 & 1 Returns",
    description: "Cancellation after 1 day",
  },
  {
    id: 3,
    image: feat3,
    title: "100% Secure Payment",
    description: "Guarantee secure payments",
  },
  {
    id: 4,
    image: feat4,
    title: "24/7 Dedicated Support",
    description: "Anywhere & anytime",
  },
  {
    id: 5,
    image: feat5,
    title: "Daily Offers",
    description: "Discount up to 70% OFF",
  },
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
    name: "contact",
    link: "/contact",
  },
  {
    name: "blogs",
    link: "/refund-policy",
  },
];
export const myAccount: Nav[] = [
  {
    name: "my cart",
    link: "/my-cart",
  },
  {
    name: "my whishlist",
    link: "/my-whishlist",
  },
  {
    name: "my addresses",
    link: "/my-addresses",
  },
  {
    name: "my profile",
    link: "/my-profile",
  },
];
export const LANGUAGES: Lang[] = [
  { flag: us, title: "english", label: "en" },
  { flag: ksa, title: "arabic", label: "ar" },
];
export const shippingMethods: Shippings[] = [
  {
    id: 1,
    name: "local pickup",
    coast: "free shipping",
  },
  {
    id: 2,
    name: "flat rate",
    coast: "30",
  },
];
