import { websiteRoutes } from "./website.routes";
// import { dashboardRoutes } from "./dashboard.routes";
import { authRoutes } from "./auth.routes";
import AuthProvider from "../store/AuthProvider";
import AxiosConfig from "../lib/axios/Axios";
import RootLayout from "../common/layout/root/RootLayout";
export const rootRoutes = {
  path: "/",
  element: (
    <AuthProvider>
      <AxiosConfig />
      <RootLayout />
    </AuthProvider>
  ),
  children: [websiteRoutes, authRoutes],
};
