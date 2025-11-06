import ErrorBoundary from "@/features/error/ErrorBoundary";
import { lazyLoad } from "../utils/LazyLoad";
import Guard from "./Guard";
export const authRoutes = {
  path: "auth",
  element: lazyLoad(() => import("../common/layout/auth/AuthLayout")),
  errorElement: <ErrorBoundary />,

  children: [
    {
      path: "login",
      element: (
        <Guard guestOnly={true}>
          {lazyLoad(() => import("../features/auth/pages/Login"))}
        </Guard>
      ),
    },
    {
      path: "register",
      element: (
        <Guard guestOnly={true}>
          {lazyLoad(() => import("../features/auth/pages/Register"))}
        </Guard>
      ),
    },
    {
      path: "forget-password",
      element: (
        <Guard>
          {lazyLoad(() => import("../features/auth/pages/ForgetPassword"))}
        </Guard>
      ),
    },
    {
      path: "forget-password-otp",
      element: (
        <Guard>
          {lazyLoad(() => import("../features/auth/pages/ForgetPasswordOtp"))}
        </Guard>
      ),
    },
    {
      path: "reset-password",
      element: (
        <Guard>
          {lazyLoad(() => import("../features/auth/pages/ResetPassword"))}
        </Guard>
      ),
    },
    {
      path: "reset-password-success",
      element: (
        <Guard>
          {lazyLoad(
            () => import("../features/auth/pages/ResetPasswordSuccess")
          )}
        </Guard>
      ),
    },
  ],
};
