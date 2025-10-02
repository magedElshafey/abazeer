import axios from "axios";
import { useTranslation } from "react-i18next";
import { useEffect } from "react";
import { apiUrl } from "../../services/api-routes/apiRoutes";
import { useAuth } from "../../store/AuthProvider";
import { toast } from "sonner";
import { useLocation, useNavigate } from "react-router-dom";
export const Axios = axios.create({
  baseURL: apiUrl,
  headers: {
    "Content-Type": "application/json",
  },
});
const AxiosConfig = () => {
  const { i18n, t } = useTranslation();
  const { user, logout, lastPublicPage } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  useEffect(() => {
    const requestInterceptor = Axios.interceptors.request.use((config) => {
      config.headers["lang"] = i18n.language;
      config.headers["Accept-Language"] = i18n.language;
      if (user) {
        Axios.defaults.headers.common[
          "Authorization"
        ] = `Bearer ${user.access_token}`;
      }
      return config;
    });

    const responseInterceptor = Axios.interceptors.response.use(
      (response) => {
        return response;
      },
      (error) => {
        if (error?.response?.status === 401) {
          logout();
          toast.dismiss();
          toast.error(t("session expired"), {
            description: t("your session is expired , you need to login again"),
            action: {
              label: t("login"),
              onClick: () => {
                navigate("/login", {
                  replace: true,
                  state: { from: location },
                });
              },
            },
            cancel: {
              label: t("cancel"),
              onClick: () => {
                navigate(lastPublicPage.current || "/");
              },
            },
          });
        }
        return Promise.reject(error);
      }
    );

    return () => {
      Axios.interceptors.request.eject(requestInterceptor);
      Axios.interceptors.response.eject(responseInterceptor);
    };
  }, [i18n.language, user]);
  return null;
};
export default AxiosConfig;
