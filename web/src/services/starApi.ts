import { apiClient } from "./api";
import type { CreateCheckInInput, CreateStarInput, Star } from "../types";

export const starApi = {
  list: () => apiClient.get<Star[]>("/stars"),

  create: (data: CreateStarInput) => apiClient.post<Star>("/stars", data),

  createCheckIn: (data: CreateCheckInInput) =>
    apiClient.post<Star>(`/stars/${data.starId}/check-ins`, {
      mood: data.mood,
      signal: data.signal,
      update: data.update,
      blocker: data.blocker,
    }),
};
