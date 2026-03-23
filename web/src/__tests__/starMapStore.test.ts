import { beforeEach, describe, expect, it } from "vitest";
import { useStarMapStore } from "@/stores/starMapStore";

describe("starMapStore", () => {
  beforeEach(() => {
    useStarMapStore.setState({
      stars: [],
      selectedStarId: null,
      lastReplyByStarId: {},
    });
  });

  it("creates a star and selects it", () => {
    useStarMapStore.getState().createStar({
      title: "Ship MVP",
      vision: "做出一个真实的返回闭环",
      whyItMatters: "这个产品方向值得被实现",
      currentState: "方向已经收敛",
    });

    const state = useStarMapStore.getState();
    expect(state.stars).toHaveLength(1);
    expect(state.selectedStarId).toBe(state.stars[0].id);
    expect(state.stars[0].nextStep).toContain("最小");
  });

  it("submits a check-in and updates star status", () => {
    useStarMapStore.getState().createStar({
      title: "Ship MVP",
      vision: "做出一个真实的返回闭环",
      whyItMatters: "这个产品方向值得被实现",
      currentState: "方向已经收敛",
    });

    const starId = useStarMapStore.getState().stars[0].id;

    useStarMapStore.getState().submitCheckIn({
      starId,
      mood: "hopeful",
      signal: "returning",
      update: "我今天重新回来看这个项目",
      blocker: "需要先把 MVP 收窄",
    });

    const state = useStarMapStore.getState();
    expect(state.stars[0].checkIns).toHaveLength(1);
    expect(state.stars[0].momentum).toBe("renewing");
    expect(state.lastReplyByStarId[starId]?.title).toBe("欢迎回来");
  });
});
