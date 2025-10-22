import React, { createContext, useContext, useState, ReactNode, useEffect} from "react";
import api from "../api/axios";
import { jwtDecode } from "jwt-decode";

interface AuthContextType {
  user: string | null;
  login: (username: string, password: string) => Promise<void>;
  register: (username: string, password: string) => Promise<void>;
  logout: () => void;
}

interface JwtPayload {
  exp: number;
  [key: string]: any;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<string | null>(localStorage.getItem("user"));
  useEffect(() => {
    const checkAuth = () => {
      const storedUser = localStorage.getItem("user");
      const accessToken = localStorage.getItem("access_token");

      if (storedUser && accessToken) {
        try {
          const decoded: JwtPayload = jwtDecode(accessToken);
          const now = Date.now() / 1000; // en secondes

          if (decoded.exp < now) {
            logout();
          } else {
            setUser(storedUser);
          }
        } catch (err) {
          logout();
        }
      }
    };

    checkAuth();
  }, []);
  const login = async (username: string, password: string) => {
    const res = await api.post("users/login/", { username, password });
    localStorage.setItem("access_token", res.data.access);
    localStorage.setItem("refresh_token", res.data.refresh);
    localStorage.setItem("user", username);
    setUser(username);
  };

  const logout = () => {
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
    localStorage.removeItem("user");
    setUser(null);
  };

  const register = async (username: string, password: string) => {
    const res = await api.post("users/register/", { username, password });
    localStorage.setItem("access_token", res.data.access);
    localStorage.setItem("refresh_token", res.data.refresh);
    localStorage.setItem("user", username);
    setUser(username);
  };


  return (
    <AuthContext.Provider value={{ user, login, logout, register }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within AuthProvider");
  return context;
};

