import { create } from "zustand";
import { persist } from "zustand/middleware";
import { Goal } from "../types";
import { generateId, getRandomColor } from "../utils";

interface GoalStore {
  goals: Goal[];
  addGoal: (
    title: string,
    description: string,
    milestoneTitles: string[],
  ) => void;
  removeGoal: (id: string) => void;
  updateGoal: (
    id: string,
    updates: Partial<Pick<Goal, "title" | "description" | "color">>,
  ) => void;
  toggleGoalStatus: (id: string) => void;

  // Milestone actions
  addMilestone: (goalId: string, title: string) => void;
  removeMilestone: (goalId: string, milestoneId: string) => void;
  toggleMilestone: (goalId: string, milestoneId: string) => void;
  updateMilestone: (goalId: string, milestoneId: string, title: string) => void;
}

export const useGoalStore = create<GoalStore>()(
  persist(
    (set) => ({
      goals: [],

      addGoal: (title, description, milestoneTitles) => {
        const newGoal: Goal = {
          id: generateId(),
          title,
          description,
          createdAt: Date.now(),
          status: "active",
          color: getRandomColor(),
          milestones: milestoneTitles.map((t) => ({
            id: generateId(),
            title: t,
            isCompleted: false,
          })),
        };
        set((state) => ({ goals: [newGoal, ...state.goals] }));
      },

      removeGoal: (id) => {
        set((state) => ({ goals: state.goals.filter((g) => g.id !== id) }));
      },

      updateGoal: (id, updates) => {
        set((state) => ({
          goals: state.goals.map((g) =>
            g.id === id ? { ...g, ...updates } : g,
          ),
        }));
      },

      toggleGoalStatus: (id) => {
        set((state) => ({
          goals: state.goals.map((g) => {
            if (g.id !== id) return g;
            const newStatus = g.status === "active" ? "completed" : "active";
            return {
              ...g,
              status: newStatus,
              completedAt: newStatus === "completed" ? Date.now() : undefined,
            };
          }),
        }));
      },

      addMilestone: (goalId, title) => {
        set((state) => ({
          goals: state.goals.map((g) => {
            if (g.id !== goalId) return g;
            return {
              ...g,
              milestones: [
                ...g.milestones,
                { id: generateId(), title, isCompleted: false },
              ],
            };
          }),
        }));
      },

      removeMilestone: (goalId, milestoneId) => {
        set((state) => ({
          goals: state.goals.map((g) => {
            if (g.id !== goalId) return g;
            return {
              ...g,
              milestones: g.milestones.filter((m) => m.id !== milestoneId),
            };
          }),
        }));
      },

      toggleMilestone: (goalId, milestoneId) => {
        set((state) => ({
          goals: state.goals.map((g) => {
            if (g.id !== goalId) return g;
            const updatedMilestones = g.milestones.map((m) =>
              m.id === milestoneId ? { ...m, isCompleted: !m.isCompleted } : m,
            );

            // Optional: Auto-complete goal if all milestones are done?
            // Let's keep it manual for now to give user the satisfaction of clicking "Complete Goal"

            return {
              ...g,
              milestones: updatedMilestones,
            };
          }),
        }));
      },

      updateMilestone: (goalId, milestoneId, title) => {
        set((state) => ({
          goals: state.goals.map((g) => {
            if (g.id !== goalId) return g;
            return {
              ...g,
              milestones: g.milestones.map((m) =>
                m.id === milestoneId ? { ...m, title } : m,
              ),
            };
          }),
        }));
      },
    }),
    {
      name: "starthere-storage",
    },
  ),
);
