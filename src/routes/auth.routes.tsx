import { lazyLoad } from "../utils/LazyLoad";
import Guard from "./Guard";

export const authRoutes = {
  element: <Guard guestOnly={true} />,
  children: [
    {
      path: "auth",
      element: lazyLoad(() => import("../common/layout/auth/AuthLayout")),
      children: [
        {
          path: "login",
          element: lazyLoad(() => import("../features/auth/pages/Login")),
        },

        {
          path: "register",
          element: lazyLoad(() => import("../features/auth/pages/Register")),
        },
        {
          path: "forget-password",
          element: lazyLoad(
            () => import("../features/auth/pages/ForgetPassword")
          ),
        },
        {
          path: "forget-password-otp",
          element: lazyLoad(
            () => import("../features/auth/pages/ForgetPasswordOtp")
          ),
        },
        {
          path: "reset-password",
          element: lazyLoad(
            () => import("../features/auth/pages/ResetPassword")
          ),
        },
        {
          path: "reset-password-success",
          element: lazyLoad(
            () => import("../features/auth/pages/ResetPasswordSuccess")
          ),
        },
      ],
    },
  ],
};
