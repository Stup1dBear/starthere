import type {
  AssistantReply,
  CheckInSignal,
  CreateCheckInInput,
  Star,
  StarMood,
} from "../types";

const MOOD_LABELS: Record<StarMood, string> = {
  clear: "你现在是清晰的",
  hopeful: "你现在是带着希望的",
  foggy: "你现在有点雾蒙蒙的",
  stuck: "你现在是卡住的",
  tired: "你现在有点累了",
  energized: "你现在是有推进感的",
};

const SIGNAL_TITLES: Record<CheckInSignal, string> = {
  progress: "轨道正在推进",
  drift: "星轨有点偏了",
  blocked: "前方有一小片陨石带",
  returning: "欢迎回来",
};

function buildReflection(signal: CheckInSignal, blocker: string): string {
  if (signal === "progress") {
    return "先把已经发生的推进看清楚，比急着加码更重要。";
  }

  if (signal === "returning") {
    return "这次最重要的不是补齐所有缺口，而是重新和这颗星建立连接。";
  }

  if (signal === "blocked" && blocker) {
    return `现在真正挡在前面的不是整条路，而是「${blocker}」这一段。`;
  }

  if (signal === "drift") {
    return "漂移不等于放弃，通常只是连接断了一阵子。";
  }

  return "先把阻力缩小到一个具体问题，路会更容易出现。";
}

function buildNextStep(signal: CheckInSignal, update: string, blocker: string): string {
  if (signal === "progress") {
    return "把刚推进的内容整理成一个 20 分钟内能继续的最小动作。";
  }

  if (signal === "returning") {
    return "花 10 分钟重读现状，然后只做第一件能恢复手感的小事。";
  }

  if (signal === "blocked" && blocker) {
    return `只处理「${blocker}」里最小、最能验证方向的一步。`;
  }

  if (update.length > 80) {
    return "把这次更新压缩成一句话，再从里面挑出今天唯一要推进的动作。";
  }

  return "先定义一个可以在今天完成的下一步，不求完整，只求恢复连续性。";
}

export function generateCompanionReply(
  star: Star,
  input: Omit<CreateCheckInInput, "starId">,
): AssistantReply {
  const reflection = buildReflection(input.signal, input.blocker.trim());
  const nextStep = buildNextStep(
    input.signal,
    input.update.trim(),
    input.blocker.trim(),
  );

  return {
    title: SIGNAL_TITLES[input.signal],
    message: `${MOOD_LABELS[input.mood]}。关于「${star.title}」，我更在意你能不能顺着现在的状态继续往前一点。`,
    reflection,
    nextStep,
  };
}

export function computeEnergy(signal: CheckInSignal, mood: StarMood): number {
  const baseBySignal: Record<CheckInSignal, number> = {
    progress: 78,
    returning: 60,
    drift: 42,
    blocked: 35,
  };

  const moodAdjustment: Record<StarMood, number> = {
    clear: 8,
    hopeful: 5,
    foggy: -8,
    stuck: -12,
    tired: -10,
    energized: 10,
  };

  return Math.max(10, Math.min(95, baseBySignal[mood === "energized" ? "progress" : signal] + moodAdjustment[mood]));
}

export function computeMomentum(signal: CheckInSignal): Star["momentum"] {
  switch (signal) {
    case "progress":
      return "steady";
    case "returning":
      return "renewing";
    case "drift":
      return "drifting";
    case "blocked":
      return "forming";
    default:
      return "forming";
  }
}
