"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

interface AuthContextType {
  isAdmin: boolean;
  login: (password: string) => Promise<boolean>;
  logout: () => void;
  password: string | null;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [isAdmin, setIsAdmin] = useState(false);
  const [password, setPassword] = useState<string | null>(null);

  useEffect(() => {
    // Check if password is stored in session storage
    const storedPassword = sessionStorage.getItem("admin_password");
    if (storedPassword) {
      verifyPassword(storedPassword);
    }
  }, []);

  const verifyPassword = async (pwd: string) => {
    try {
      const response = await fetch("/api/auth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password: pwd }),
      });

      if (response.ok) {
        setIsAdmin(true);
        setPassword(pwd);
        sessionStorage.setItem("admin_password", pwd);
        return true;
      }
      return false;
    } catch {
      return false;
    }
  };

  const login = async (pwd: string) => {
    return await verifyPassword(pwd);
  };

  const logout = () => {
    setIsAdmin(false);
    setPassword(null);
    sessionStorage.removeItem("admin_password");
  };

  return (
    <AuthContext.Provider value={{ isAdmin, login, logout, password }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return context;
}
