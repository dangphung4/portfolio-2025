"use client";

import React, { useState, useEffect } from "react";
import { Button } from "./button";
import { Input } from "./input";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "./card";
import { Lock, LogOut } from "lucide-react";

interface AuthGateProps {
  children: React.ReactNode;
  action?: string;
}

const AUTH_KEY = "food-reviews-auth";
const SESSION_DURATION = 30 * 60 * 1000; // 30 minutes

export function AuthGate({ children, action = "perform this action" }: AuthGateProps) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [pin, setPin] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    // Check if there's a valid session
    const authData = localStorage.getItem(AUTH_KEY);
    if (authData) {
      try {
        const { timestamp } = JSON.parse(authData);
        const now = Date.now();
        if (now - timestamp < SESSION_DURATION) {
          setIsAuthenticated(true);
        } else {
          localStorage.removeItem(AUTH_KEY);
        }
      } catch {
        localStorage.removeItem(AUTH_KEY);
      }
    }
  }, []);

  const handleAuth = (e: React.FormEvent) => {
    e.preventDefault();

    // Simple PIN check - in production, this would be more secure
    // For now, let's use a simple PIN that the user can set
    const savedPin = localStorage.getItem("food-reviews-pin");

    if (!savedPin) {
      // First time setup - save the PIN
      localStorage.setItem("food-reviews-pin", pin);
      localStorage.setItem(AUTH_KEY, JSON.stringify({ timestamp: Date.now() }));
      setIsAuthenticated(true);
      setError("");
    } else if (pin === savedPin) {
      // Correct PIN
      localStorage.setItem(AUTH_KEY, JSON.stringify({ timestamp: Date.now() }));
      setIsAuthenticated(true);
      setError("");
    } else {
      // Wrong PIN
      setError("Incorrect PIN");
      setPin("");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem(AUTH_KEY);
    setIsAuthenticated(false);
    setPin("");
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center p-4">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <div className="mx-auto mb-4 h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
              <Lock className="h-6 w-6 text-primary" />
            </div>
            <CardTitle>Authentication Required</CardTitle>
            <CardDescription>
              Enter your PIN to {action}
              {!localStorage.getItem("food-reviews-pin") && (
                <span className="block mt-2 text-xs">
                  First time? Create a PIN to secure your reviews.
                </span>
              )}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleAuth} className="space-y-4">
              <div>
                <Input
                  type="password"
                  inputMode="numeric"
                  pattern="[0-9]*"
                  placeholder="Enter 4-digit PIN"
                  value={pin}
                  onChange={(e) => {
                    setPin(e.target.value);
                    setError("");
                  }}
                  maxLength={4}
                  className="text-center text-2xl tracking-widest"
                  autoFocus
                />
                {error && (
                  <p className="text-sm text-destructive mt-2 text-center">{error}</p>
                )}
              </div>
              <Button type="submit" className="w-full" disabled={pin.length !== 4}>
                {!localStorage.getItem("food-reviews-pin") ? "Create PIN" : "Unlock"}
              </Button>
              <p className="text-xs text-muted-foreground text-center">
                Your PIN is stored locally in your browser
              </p>
            </form>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div>
      <div className="flex justify-end mb-4">
        <Button
          variant="ghost"
          size="sm"
          onClick={handleLogout}
          className="text-muted-foreground"
        >
          <LogOut className="h-4 w-4 mr-2" />
          Lock
        </Button>
      </div>
      {children}
    </div>
  );
}

// Hook to check if authenticated
export function useAuth() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const checkAuth = () => {
      const authData = localStorage.getItem(AUTH_KEY);
      if (authData) {
        try {
          const { timestamp } = JSON.parse(authData);
          const now = Date.now();
          if (now - timestamp < SESSION_DURATION) {
            setIsAuthenticated(true);
            return;
          }
        } catch {
          // Invalid data
        }
      }
      setIsAuthenticated(false);
    };

    checkAuth();
    // Check every minute
    const interval = setInterval(checkAuth, 60000);
    return () => clearInterval(interval);
  }, []);

  return isAuthenticated;
}
