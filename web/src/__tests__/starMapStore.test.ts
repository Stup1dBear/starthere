import { beforeEach, describe, expect, it, vi } from "vitest";
import { useStarMapStore } from "@/stores/starMapStore";
import { starApi } from "@/services/starApi";

vi.mock("@/services/starApi", () => ({
  starApi: {
    list: vi.fn(),
    create: vi.fn(),
    createCheckIn: vi.fn(),
  },
}));

describe("starMapStore", () => {
  beforeEach(() => {
    useStarMapStore.setState({
      stars: [],
      selectedStarId: null,
      isLoading: false,
      error: null,
    });
  });

  it("creates a star and selects it", async () => {
    vi.mocked(starApi.create).mockResolvedValue({
      success: true,
      data: {
        id: "star-1",
        title: "Ship MVP",
        vision: "做出一个真实的返回闭环",
        whyItMatters: "这个产品方向值得被实现",
        currentState: "方向已经收敛",
        color: "#FFD700",
        createdAt: 1,
        updatedAt: 1,
        momentum: "forming",
        energy: 52,
        status: "active",
        nextStep: "先做一件最小但真实的开始动作。",
        checkIns: [],
      },
    });

    const created = await useStarMapStore.getState().createStar({
      title: "Ship MVP",
      vision: "做出一个真实的返回闭环",
      whyItMatters: "这个产品方向值得被实现",
      currentState: "方向已经收敛",
    });

    const state = useStarMapStore.getState();
    expect(created).toBe(true);
    expect(state.stars).toHaveLength(1);
    expect(state.selectedStarId).toBe(state.stars[0].id);
    expect(state.stars[0].nextStep).toContain("最小");
  });

  it("submits a check-in and updates star status", async () => {
    const starId = "star-1";

    useStarMapStore.setState({
      stars: [
        {
          id: starId,
          title: "Ship MVP",
          vision: "做出一个真实的返回闭环",
          whyItMatters: "这个产品方向值得被实现",
          currentState: "方向已经收敛",
          color: "#FFD700",
          createdAt: 1,
          updatedAt: 1,
          momentum: "forming",
          energy: 52,
          status: "active",
          nextStep: "先做一件最小但真实的开始动作。",
          checkIns: [],
        },
      ],
      selectedStarId: starId,
      isLoading: false,
      error: null,
    });

    vi.mocked(starApi.createCheckIn).mockResolvedValue({
      success: true,
      data: {
        id: starId,
        title: "Ship MVP",
        vision: "做出一个真实的返回闭环",
        whyItMatters: "这个产品方向值得被实现",
        currentState: "我今天重新回来看这个项目",
        color: "#FFD700",
        createdAt: 1,
        updatedAt: 2,
        lastCheckInAt: 2,
        momentum: "renewing",
        energy: 65,
        status: "active",
        nextStep: "花 10 分钟重读现状，然后只做第一件能恢复手感的小事。",
        checkIns: [
          {
            id: "checkin-1",
            starId,
            createdAt: 2,
            mood: "hopeful",
            signal: "returning",
            update: "我今天重新回来看这个项目",
            blocker: "需要先把 MVP 收窄",
            nextStep: "花 10 分钟重读现状，然后只做第一件能恢复手感的小事。",
            companionReply: {
              title: "欢迎回来",
              message: "test",
              reflection: "test",
              nextStep: "花 10 分钟重读现状，然后只做第一件能恢复手感的小事。",
            },
          },
        ],
      },
    });

    const submitted = await useStarMapStore.getState().submitCheckIn({
      starId,
      mood: "hopeful",
      signal: "returning",
      update: "我今天重新回来看这个项目",
      blocker: "需要先把 MVP 收窄",
    });

    const state = useStarMapStore.getState();
    expect(submitted).toBe(true);
    expect(state.stars[0].checkIns).toHaveLength(1);
    expect(state.stars[0].momentum).toBe("renewing");
    expect(state.stars[0].checkIns[0].companionReply.title).toBe("欢迎回来");
  });
});
