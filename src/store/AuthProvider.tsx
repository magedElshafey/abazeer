import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  useRef,
} from "react";
import { useLocation } from "react-router-dom";
import { isProtectedRoutes } from "../utils/isProtectedRoutes";
import { User } from "../types/User";
import { getCookie, removeCookie, setCookie } from "../utils/cookie";
interface AuthContextProps {
  user: User | null;
  login: (userData: User) => void;
  logout: () => void;
  updateUser: (userData: User) => void;
  loading: boolean;
  lastPublicPage: React.MutableRefObject<string>;
}
const AuthContext = createContext<AuthContextProps | undefined>(undefined);
interface AuthProviderProps {
  children: React.ReactNode;
}
const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const lastPublicPage = useRef("/");
  const location = useLocation();
  useEffect(() => {
    if (!isProtectedRoutes(location?.pathname)) {
      lastPublicPage.current = location.pathname + location.search;
    }
  }, [location]);

  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<User | null>(null);
  useEffect(() => {
    const token = getCookie("auth_token");
    if (token) {
      const data = JSON.parse(token);
      setUser(data);
    }
    setLoading(false);
  }, []);
  const login = (userData: User) => {
    const data = JSON.stringify(userData);
    setCookie("auth_token", data, {
      path: "/",
      expires: new Date("9999-12-31T23:59:59.999Z"),
    });
    setUser(userData);
  };
  const logout = () => {
    removeCookie("auth_token");
    setUser(null);
  };
  const updateUser = (userData: User) => {
    removeCookie("auth_token");
    setUser((prev) => {
      if (prev === null) {
        return null;
      }
      const updatedUser = { ...prev, ...userData };
      const data = JSON.stringify(updatedUser);
      setCookie("auth_token", data, {
        path: "/",
        expires: new Date("9999-12-31T23:59:59.999Z"),
      });
      return updatedUser;
    });
  };
  return (
    <AuthContext.Provider
      value={{ loading, user, login, logout, updateUser, lastPublicPage }}
    >
      {children}
    </AuthContext.Provider>
  );
};
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("use auth must be work in auth provider");
  }
  return context;
};
export default AuthProvider;
