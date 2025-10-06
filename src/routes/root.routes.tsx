import { websiteRoutes } from "./website.routes";
// import { dashboardRoutes } from "./dashboard.routes";
import { authRoutes } from "./auth.routes";
import AuthProvider from "../store/AuthProvider";
import AxiosConfig from "../lib/axios/Axios";
import RootLayout from "../common/layout/root/RootLayout";
import { CartProvider } from "@/store/CartProvider";
export const rootRoutes = {
  path: "/",
  element: (
    <AuthProvider>
      <CartProvider>
        <AxiosConfig />
        <RootLayout />
      </CartProvider>
    </AuthProvider>
  ),
  children: [websiteRoutes, authRoutes],
};
