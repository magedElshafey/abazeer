import { useAuth } from "../store/AuthProvider";
import { Navigate, useLocation, Outlet } from "react-router-dom";

type GuardProps = {
  requireAuth?: boolean;
  guestOnly?: boolean;
  allowedRoles?: string[];
  redirectTo?: string;
  children?: React.ReactNode; // 👈 أضفناها
};

const Guard: React.FC<GuardProps> = ({
  requireAuth = false,
  guestOnly = false,
  allowedRoles,
  redirectTo,
  children, // 👈 استقبلناها
}) => {
  const { user } = useAuth();
  const location = useLocation();

  // لو الصفحة للزوار فقط وهو مسجل دخول → Redirect
  if (guestOnly && user) {
    return (
      <Navigate
        to={redirectTo || "/my-profile"}
        state={{ from: location }}
        replace
      />
    );
  }

  // لو الصفحة عايزة تسجيل دخول وهو مش مسجل → Redirect
  if (requireAuth && !user) {
    return (
      <Navigate
        to={redirectTo || "/login"}
        state={{ from: location }}
        replace
      />
    );
  }

  // لو في شرط role وهو مش متحقق → Redirect
  if (allowedRoles && user && !allowedRoles.includes(user.role)) {
    return (
      <Navigate
        to={redirectTo || "/unauthorized"}
        state={{ from: location }}
        replace
      />
    );
  }

  return <>{children || <Outlet />}</>;
};

export default Guard;
