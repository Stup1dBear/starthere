import { create } from "zustand";
import { createJSONStorage, persist, type StateStorage } from "zustand/middleware";
import type { User } from "../types/auth";

interface AuthStore {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;

  // Actions
  login: (token: string, user: User) => void;
  logout: () => void;
  setUserVerified: () => void;
}

const memoryStorage = new Map<string, string>();

const storageAdapter: StateStorage = {
  getItem: (name) => {
    if (
      typeof window !== "undefined" &&
      typeof window.localStorage?.getItem === "function"
    ) {
      return window.localStorage.getItem(name);
    }
    return memoryStorage.get(name) ?? null;
  },
  setItem: (name, value) => {
    if (
      typeof window !== "undefined" &&
      typeof window.localStorage?.setItem === "function"
    ) {
      window.localStorage.setItem(name, value);
      return;
    }
    memoryStorage.set(name, value);
  },
  removeItem: (name) => {
    if (
      typeof window !== "undefined" &&
      typeof window.localStorage?.removeItem === "function"
    ) {
      window.localStorage.removeItem(name);
      return;
    }
    memoryStorage.delete(name);
  },
};

export const useAuthStore = create<AuthStore>()(
  persist(
    (set) => ({
      user: null,
      token: null,
      isAuthenticated: false,

      login: (token, user) =>
        set({
          token,
          user,
          isAuthenticated: true,
        }),

      logout: () =>
        set({
          token: null,
          user: null,
          isAuthenticated: false,
        }),

      setUserVerified: () =>
        set((state) => ({
          user: state.user ? { ...state.user, is_verified: true } : null,
        })),
    }),
    {
      name: "starthere-auth",
      storage: createJSONStorage(() => storageAdapter),
    }
  )
);
