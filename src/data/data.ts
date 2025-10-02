// types
import type { Pricing } from "../features/home/website/types/Pricing";
import type { Nav } from "../types/Nav";
import type { Socials } from "../types/Socials";
import type { AcademyServiceType } from "../features/home/website/types/AcademyServiceType";
// assets

// react icons
import {
  FaFacebook,
  FaInstagram,
  FaBehance,
  FaLinkedin,
  FaSnapchatGhost,
  FaWhatsapp,
} from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
// images
import serv1 from "../assets/serv-01.png";
import serv2 from "../assets/serv-02.png";
import serv3 from "../assets/serv-03.png";
import serv4 from "../assets/serv-04.png";
export const navLinks: Nav[] = [
  {
    name: "offers",
    link: "/offers",
  },
  {
    name: "About",
    link: "/about",
  },

  {
    name: "branches",
    link: "/branches",
  },
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
    link: "/contact",
  },
];

export const socials: Socials[] = [
  {
    name: "whatsapp",
    url: "https://wa.me/+201022153359",
    icon: FaWhatsapp,
  },
  {
    name: "facebook",
    url: "https://www.facebook.com/",
    icon: FaFacebook,
  },
  {
    name: "twitter",
    url: "https://www.twitter.com/",
    icon: FaXTwitter,
  },
  {
    name: "instagram",
    url: "https://www.instagram.com/",
    icon: FaInstagram,
  },
  {
    name: "behance",
    url: "https://www.behance.com/",
    icon: FaBehance,
  },
  {
    name: "linkedin",
    url: "https://www.linkedin.com/",
    icon: FaLinkedin,
  },
  {
    name: "snapchat",
    url: "https://www.snapchat.com/",
    icon: FaSnapchatGhost,
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
export const plans: Pricing[] = [
  {
    id: 1,
    title: "الخطة السنوية",
    price: "$742",
    period: "سنوياً",
    description:
      "هذا النص هو مثال لنص يمكن أن يستبدل في نفس المساحة، لقد تم توليد هذا النص من مولد النص العربى، حيث يمكنك أن تولد مثل هذا النص أو العديد من النصوص الأخرى إضافة إلى زيادة عدد الحروف التى يولدها التطبيق.",
  },
  {
    id: 2,
    title: "الخطة الشهرية",
    price: "$98",
    period: "شهرياً",
    description:
      "هذا النص هو مثال لنص يمكن أن يستبدل في نفس المساحة، لقد تم توليد هذا النص من مولد النص العربى، حيث يمكنك أن تولد مثل هذا النص أو العديد من النصوص الأخرى إضافة إلى زيادة عدد الحروف التى يولدها التطبيق.",
    highlight: true,
  },
  {
    id: 3,
    title: "الخطة الأساسية",
    price: "$0",
    period: "دائماً",
    description:
      "هذا النص هو مثال لنص يمكن أن يستبدل في نفس المساحة، لقد تم توليد هذا النص من مولد النص العربى، حيث يمكنك أن تولد مثل هذا النص أو العديد من النصوص الأخرى إضافة إلى زيادة عدد الحروف التى يولدها التطبيق.",
  },
];
export const academyServices: AcademyServiceType[] = [
  {
    id: 1,
    image: serv1,
    title: "Download the training plan",
  },
  {
    id: 2,
    image: serv2,
    title: "Training applications for companies and government agencies",
  },
  {
    id: 3,
    image: serv3,
    title: "Subscribe as a trainer or expert",
  },
  {
    id: 4,
    image: serv4,
    title: "Remote training",
  },
];
