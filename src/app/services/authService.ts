import axios from "axios";
import {
  SignInDto,
  SignUpDto,
  AuthResponseDto,
  UserProfileDto,
} from "../types";

const apiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL + "/auth",
});

export const AuthService = {
  async signIn(signInDto: SignInDto): Promise<AuthResponseDto> {
    try {
      const response = await apiClient.post<AuthResponseDto>(
        "/login",
        signInDto
      );
      return response.data;
    } catch (error) {
      throw new Error("Login failed");
    }
  },

  async signUp(signUpDto: SignUpDto): Promise<AuthResponseDto> {
    try {
      const response = await apiClient.post<AuthResponseDto>(
        "/signup",
        signUpDto
      );
      return response.data;
    } catch (error) {
      throw new Error("Signup failed");
    }
  },

  async getProfile(): Promise<UserProfileDto> {
    try {
      const token = localStorage.getItem("access_token");
      const response = await apiClient.get("/profile", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      throw new Error("Fetching profile failed");
    }
  },

  async logout(): Promise<void> {
    localStorage.removeItem("access_token");
  },
};
