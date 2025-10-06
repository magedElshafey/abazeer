import { IconType } from "react-icons";
import { 
  FiHome, 
  FiShoppingBag, 
  FiHeart, 
  FiStar, 
  FiSettings, 
  FiLogOut 
} from "react-icons/fi";

export type ProfileRouteKey =
  | "overview"
  | "orders"
  | "favorites"
  | "reviews"
  | "account-settings"
  | "logout";

export interface ProfileRouteItem {
  id: ProfileRouteKey;
  label: string;
  path: string; // relative to /my-profile
  icon: IconType;
}

export const PROFILE_ROUTES: ProfileRouteItem[] = [
  { id: "overview", label: "overview", path: ".", icon: FiHome },
  { id: "orders", label: "orders", path: "orders", icon: FiShoppingBag },
  { id: "favorites", label: "favorites", path: "favorites", icon: FiHeart },
  { id: "reviews", label: "reviews", path: "reviews", icon: FiStar },
  { id: "account-settings", label: "account_settings", path: "account", icon: FiSettings },
  { id: "logout", label: "logout", path: "/logout", icon: FiLogOut },
];