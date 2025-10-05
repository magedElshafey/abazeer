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
  children,
}) => {
  const { user, loading } = useAuth();
  const location = useLocation();

  console.log(children);

  if(loading) return undefined;

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
        to={redirectTo || "/auth/login"}
        state={{ from: location }}
        replace
      />
    );
  }

  // !! handling the authorization was in the old logic in Rooa, but currently doesn't make sense
  if (allowedRoles && user && !allowedRoles.includes("")) {
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
