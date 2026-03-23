import { create } from "zustand";
import type { CreateCheckInInput, CreateStarInput, Star } from "../types";
import { starApi } from "../services/starApi";

interface StarMapState {
  stars: Star[];
  selectedStarId: string | null;
  isLoading: boolean;
  error: string | null;
  fetchStars: () => Promise<void>;
  createStar: (input: CreateStarInput) => Promise<boolean>;
  selectStar: (starId: string) => void;
  submitCheckIn: (input: CreateCheckInInput) => Promise<boolean>;
  reset: () => void;
}

const initialState = {
  stars: [],
  selectedStarId: null,
  isLoading: false,
  error: null,
};

export const useStarMapStore = create<StarMapState>()((set, get) => ({
  ...initialState,

  fetchStars: async () => {
    set({ isLoading: true, error: null });
    const response = await starApi.list();

    if (!response.success || !response.data) {
      set({
        isLoading: false,
        error: response.error || "加载星图失败",
      });
      return;
    }

    const selectedStarId = get().selectedStarId;
    const fallbackSelectedStarId =
      response.data.find((star) => star.id === selectedStarId)?.id ??
      response.data[0]?.id ??
      null;

    set({
      stars: response.data,
      selectedStarId: fallbackSelectedStarId,
      isLoading: false,
      error: null,
    });
  },

  createStar: async (input) => {
    set({ isLoading: true, error: null });
    const response = await starApi.create(input);

    if (!response.success || !response.data) {
      set({
        isLoading: false,
        error: response.error || "创建星星失败",
      });
      return false;
    }

    set((state) => ({
      stars: [response.data!, ...state.stars],
      selectedStarId: response.data!.id,
      isLoading: false,
      error: null,
    }));
    return true;
  },

  selectStar: (starId) => set({ selectedStarId: starId }),

  submitCheckIn: async (input) => {
    set({ isLoading: true, error: null });
    const response = await starApi.createCheckIn(input);

    if (!response.success || !response.data) {
      set({
        isLoading: false,
        error: response.error || "记录 check-in 失败",
      });
      return false;
    }

    set((state) => ({
      stars: state.stars.map((star) =>
        star.id === response.data!.id ? response.data! : star,
      ),
      selectedStarId: response.data!.id,
      isLoading: false,
      error: null,
    }));
    return true;
  },

  reset: () => set({ ...initialState }),
}));
