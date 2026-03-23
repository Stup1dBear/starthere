import { create } from "zustand";
import { createJSONStorage, persist, type StateStorage } from "zustand/middleware";
import type { CreateCheckInInput, CreateStarInput, Star } from "../types";
import {
  computeEnergy,
  computeMomentum,
  generateCompanionReply,
} from "../services/companion";
import { generateId, getRandomColor } from "../utils";

interface StarMapState {
  stars: Star[];
  selectedStarId: string | null;
  lastReplyByStarId: Record<string, Star["checkIns"][number]["companionReply"]>;
  createStar: (input: CreateStarInput) => void;
  selectStar: (starId: string) => void;
  submitCheckIn: (input: CreateCheckInInput) => void;
  archiveStar: (starId: string) => void;
}

const initialState = {
  stars: [],
  selectedStarId: null,
  lastReplyByStarId: {},
};

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

export const useStarMapStore = create<StarMapState>()(
  persist(
    (set) => ({
      ...initialState,

      createStar: (input) =>
        set((state) => {
          const now = Date.now();
          const star: Star = {
            id: generateId(),
            title: input.title.trim(),
            vision: input.vision.trim(),
            whyItMatters: input.whyItMatters.trim(),
            currentState: input.currentState.trim(),
            color: getRandomColor(),
            createdAt: now,
            updatedAt: now,
            momentum: "forming",
            energy: 52,
            status: "active",
            nextStep: "先做一件最小但真实的开始动作。",
            checkIns: [],
          };

          return {
            stars: [star, ...state.stars],
            selectedStarId: star.id,
          };
        }),

      selectStar: (starId) => set({ selectedStarId: starId }),

      submitCheckIn: (input) =>
        set((state) => {
          const star = state.stars.find((item) => item.id === input.starId);
          if (!star) {
            return state;
          }

          const reply = generateCompanionReply(star, {
            mood: input.mood,
            signal: input.signal,
            update: input.update,
            blocker: input.blocker,
          });
          const now = Date.now();
          const entry = {
            id: generateId(),
            starId: star.id,
            createdAt: now,
            mood: input.mood,
            signal: input.signal,
            update: input.update.trim(),
            blocker: input.blocker.trim(),
            nextStep: reply.nextStep,
            companionReply: reply,
          };

          return {
            stars: state.stars.map((item) =>
              item.id === star.id
                ? {
                    ...item,
                    updatedAt: now,
                    lastCheckInAt: now,
                    currentState: input.update.trim(),
                    nextStep: reply.nextStep,
                    momentum: computeMomentum(input.signal),
                    energy: computeEnergy(input.signal, input.mood),
                    checkIns: [entry, ...item.checkIns],
                  }
                : item,
            ),
            lastReplyByStarId: {
              ...state.lastReplyByStarId,
              [star.id]: reply,
            },
          };
        }),

      archiveStar: (starId) =>
        set((state) => ({
          stars: state.stars.map((star) =>
            star.id === starId ? { ...star, status: "archived" } : star,
          ),
        })),
    }),
    {
      name: "starthere-star-map",
      storage: createJSONStorage(() => storageAdapter),
    },
  ),
);
