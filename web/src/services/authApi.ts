import { apiClient } from "./api";
import type {
  AuthResponse,
  RegisterRequest,
  RegisterResponse,
  LoginRequest,
  ResendVerificationRequest,
  User,
} from "../types/auth";

export const authApi = {
  register: (data: RegisterRequest) =>
    apiClient.post<RegisterResponse>("/auth/register", data),

  login: (data: LoginRequest) =>
    apiClient.post<AuthResponse>("/auth/login", data),

  verifyEmail: (token: string) =>
    apiClient.get<void>(`/auth/verify?token=${token}`),

  resendVerification: (data: ResendVerificationRequest) =>
    apiClient.post<void>("/auth/resend-verification", data),

  getMe: () => apiClient.get<Pick<User, "id" | "username">>("/auth/me"),
};
