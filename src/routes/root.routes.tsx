import { websiteRoutes } from "./website.routes";
// import { dashboardRoutes } from "./dashboard.routes";
import { authRoutes } from "./auth.routes";
import AuthProvider from "../store/AuthProvider";
import AxiosConfig from "../lib/axios/Axios";
import RootLayout from "../common/layout/root/RootLayout";
import { CartProvider } from "@/store/CartProvider";
import NotFound from "@/features/app-status/pages/not-found/NotFound";
import ErrorBoundary from "@/features/error/ErrorBoundary";
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
  errorElement: <ErrorBoundary />,
  children: [
    websiteRoutes,
    authRoutes,
    {
      path: "*",
      element: <NotFound />,
    },
  ],
};
