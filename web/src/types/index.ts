export interface Milestone {
  id: string;
  title: string;
  isCompleted: boolean;
}

export interface Goal {
  id: string;
  title: string;
  description: string;
  createdAt: number;
  completedAt?: number;
  status: "active" | "completed";
  milestones: Milestone[];
  color: string; // HEX color for the star
}

export type GoalFormData = Pick<Goal, "title" | "description" | "color"> & {
  milestones: string[]; // List of titles for initial milestones
};
