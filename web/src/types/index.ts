export type StarMood =
  | "clear"
  | "hopeful"
  | "foggy"
  | "stuck"
  | "tired"
  | "energized";

export type CheckInSignal = "progress" | "drift" | "blocked" | "returning";

export type MomentumState = "forming" | "steady" | "drifting" | "renewing";

export interface AssistantReply {
  title: string;
  message: string;
  reflection: string;
  nextStep: string;
}

export interface CheckInEntry {
  id: string;
  starId: string;
  createdAt: number;
  mood: StarMood;
  signal: CheckInSignal;
  update: string;
  blocker: string;
  nextStep: string;
  companionReply: AssistantReply;
}

export interface Star {
  id: string;
  title: string;
  vision: string;
  whyItMatters: string;
  currentState: string;
  color: string;
  createdAt: number;
  updatedAt: number;
  lastCheckInAt?: number;
  momentum: MomentumState;
  energy: number;
  status: "active" | "archived";
  nextStep: string;
  checkIns: CheckInEntry[];
}

export interface CreateStarInput {
  title: string;
  vision: string;
  whyItMatters: string;
  currentState: string;
}

export interface CreateCheckInInput {
  starId: string;
  mood: StarMood;
  signal: CheckInSignal;
  update: string;
  blocker: string;
}
