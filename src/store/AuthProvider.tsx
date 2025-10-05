import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  useRef,
} from "react";
import { useLocation } from "react-router-dom";
import { isProtectedRoutes } from "../utils/isProtectedRoutes";
import type { User } from "@/features/auth/types/auth.types";

interface AuthContextProps {
  user: User | null;
  login: (userData: User) => void;
  logout: () => void;
  loading: boolean;
  lastPublicPage: React.MutableRefObject<string>;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);
interface AuthProviderProps {
  children: React.ReactNode;
}

const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  // global states
  const location = useLocation();
  
  // local states
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<User | null>(null);
  const lastPublicPage = useRef("/");
  
  // effects
  useEffect(() => {
    if (!isProtectedRoutes(location?.pathname)) {
      lastPublicPage.current = location.pathname + location.search;
    }
  }, [location]);

  useEffect(() => {
    const user = localStorage.getItem("user");
    if (user) {
      const data = JSON.parse(user);
      setUser(data);
    }
    setLoading(false);
  }, []);

  const login = (userData: User) => {
    const data = JSON.stringify(userData);
    localStorage.setItem("user", data);
    setUser(userData);
  };

  const logout = () => {
    localStorage.removeItem("user");
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{ loading, user, login, logout, lastPublicPage }}
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
