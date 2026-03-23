import { describe, expect, it } from "vitest";
import { computeEnergy, computeMomentum, generateCompanionReply } from "@/services/companion";
import type { Star } from "@/types";

const star: Star = {
  id: "star-1",
  title: "Ship StartHere MVP",
  vision: "让用户回来看见一颗真正重要的星",
  whyItMatters: "它代表长期项目不该被漂移吞掉",
  currentState: "刚完成产品方向收敛",
  color: "#FFD700",
  createdAt: 1,
  updatedAt: 1,
  momentum: "forming",
  energy: 50,
  status: "active",
  nextStep: "写下第一步",
  checkIns: [],
};

describe("companion service", () => {
  it("为 returning check-in 生成欢迎回归的回复", () => {
    const reply = generateCompanionReply(star, {
      mood: "foggy",
      signal: "returning",
      update: "我停了几天，今天想重新接上",
      blocker: "",
    });

    expect(reply.title).toBe("欢迎回来");
    expect(reply.message).toContain("Ship StartHere MVP");
    expect(reply.nextStep).toContain("10 分钟");
  });

  it("blocked check-in 会把 blocker 缩成更小的下一步", () => {
    const reply = generateCompanionReply(star, {
      mood: "stuck",
      signal: "blocked",
      update: "我不知道首页到底该怎么收敛",
      blocker: "首页信息太散",
    });

    expect(reply.reflection).toContain("首页信息太散");
    expect(reply.nextStep).toContain("首页信息太散");
  });

  it("根据 signal 计算 momentum", () => {
    expect(computeMomentum("progress")).toBe("steady");
    expect(computeMomentum("drift")).toBe("drifting");
    expect(computeMomentum("returning")).toBe("renewing");
  });

  it("energy 会被限制在合理区间", () => {
    expect(computeEnergy("progress", "energized")).toBeLessThanOrEqual(95);
    expect(computeEnergy("blocked", "stuck")).toBeGreaterThanOrEqual(10);
  });
});
