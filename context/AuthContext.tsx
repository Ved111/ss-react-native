import React, { createContext, useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { login as mockLogin, logout as mockLogout, signup } from "../utils/mockApi";

type AuthContextType = {
  userToken: string | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  loading: boolean;
};

export const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [userToken, setUserToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadToken = async () => {
      const token = await AsyncStorage.getItem("userToken");
      setUserToken(token);
      setLoading(false);
    };
    loadToken();
  }, []);

  const login = async (email: string, password: string) => {
    try {
      const response = await mockLogin(email, password);
      await AsyncStorage.setItem("userToken", response.token);
      setUserToken(response.token);
    } catch (error) {
      alert(error.message);
    }
  };

  const logout = async () => {
    await mockLogout();
    await AsyncStorage.removeItem("userToken");
    setUserToken(null);
  };

  const signup = async (email: string, password: string) => {
    try {
      const response = await signup(email, password);
      await AsyncStorage.setItem("userToken", response.token);
      setUserToken(response.token);
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <AuthContext.Provider value={{ userToken, login, logout, loading, signup }}>
      {children}
    </AuthContext.Provider>
  );
};
