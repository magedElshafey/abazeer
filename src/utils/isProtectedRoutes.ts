import { protectedRoutes } from "../data/data";

export const isProtectedRoutes = (pathname: string) => {
  return protectedRoutes.some(
    (route) => pathname === route || pathname.startsWith(route + "/")
  );
};
