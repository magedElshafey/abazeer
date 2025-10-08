import { FC } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { PROFILE_ROUTES, ProfileRouteItem } from "../constants/profileRoutes";
import LogoutButton from "@/features/auth/components/LogoutButton";

interface ProfileNavProps {
  onNavigate?: (route: ProfileRouteItem) => void;
}

const ProfileNav: FC<ProfileNavProps> = ({ onNavigate }) => {
  const { t } = useTranslation();
  const location = useLocation();

  const isActive = (path: string) => {
    if (path === ".") return location.pathname.endsWith("/my-profile");
    return location.pathname.includes(`/my-profile/${path}`);
  };

  return (
    <div className="bg-background-gray rounded-md p-4">
      <div className="flex flex-col gap-2">
        {PROFILE_ROUTES.map((item) => {
          const Icon = item.icon;
          const isLogout = item.id === "logout";

          const navContent = (
            <NavLink
              key={item.id}
              to={item.path}
              className={({ isActive: linkActive }) => {
                return `flex items-center gap-3 text-left px-4 py-3 rounded transition-colors ${
                  linkActive && isActive(item.path)
                    ? "bg-orangeColor text-white"
                    : "hover:bg-gray-200 text-text-light"
                }`
              }}
              onClick={(e) => {
                if(isLogout) return e.preventDefault();
                onNavigate?.(item);
              }}
            >
              <Icon size={20} />
              {t(item.label)}
            </NavLink>
          );

          return isLogout ? (
            <LogoutButton key={item.id}>{navContent}</LogoutButton>
          ) : (
            navContent
          );
        })}
      </div>
    </div>
  );
};

export default ProfileNav;


