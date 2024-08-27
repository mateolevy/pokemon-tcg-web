"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { AuthService } from "../services/authService";
import { SignInDto, SignUpDto, UserProfileDto } from "../types";

interface AuthContextType {
  user: UserProfileDto | null;
  login: (signInDto: SignInDto) => Promise<void>;
  signup: (signUpDto: SignUpDto) => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<UserProfileDto | null>(null);
  const router = useRouter();

  const login = async (signInDto: SignInDto): Promise<void> => {
    try {
      const authResponse = await AuthService.signIn(signInDto);
      localStorage.setItem("access_token", authResponse.access_token);
      const user = await AuthService.getProfile();
      setUser(user);
      router.push("/");
    } catch (error) {
      console.error("Failed to login:", error);
      throw error; // Propagate the error to the caller
    }
  };

  const signup = async (signUpDto: SignUpDto): Promise<void> => {
    try {
      const authResponse = await AuthService.signUp(signUpDto);
      localStorage.setItem("access_token", authResponse.access_token);
      const user = await AuthService.getProfile();
      setUser(user);
      router.push("/");
    } catch (error) {
      console.error("Failed to sign up:", error);
      throw error;
    }
  };

  const logout = () => {
    AuthService.logout();
    setUser(null);
    router.push("/auth/login");
  };

  useEffect(() => {
    if (!router) return;

    const fetchProfile = async () => {
      try {
        const profile = await AuthService.getProfile();
        setUser(profile);
      } catch (error) {
        console.error("Failed to fetch profile:", error);
        logout();
      }
    };

    fetchProfile();
  }, [router]);

  const isAuthenticated = !!user;

  return (
    <AuthContext.Provider
      value={{ user, login, signup, logout, isAuthenticated }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
