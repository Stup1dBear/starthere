/**
 * utils 函数测试
 *
 * TDD 工作流示例：
 * 1. 先写测试（失败）
 * 2. 写代码让测试通过
 * 3. 重构
 */

import { describe, it, expect } from "vitest";
import { generateId, getRandomColor, STAR_COLORS } from "@/utils";

describe("utils", () => {
  describe("generateId", () => {
    it("应该生成一个字符串 ID", () => {
      const id = generateId();
      expect(typeof id).toBe("string");
    });

    it("应该生成非空的 ID", () => {
      const id = generateId();
      expect(id.length).toBeGreaterThan(0);
    });

    it("应该生成唯一的 ID（多次调用不重复）", () => {
      const id1 = generateId();
      const id2 = generateId();
      const id3 = generateId();
      expect(id1).not.toBe(id2);
      expect(id1).not.toBe(id3);
      expect(id2).not.toBe(id3);
    });
  });

  describe("getRandomColor", () => {
    it("应该返回一个颜色字符串", () => {
      const color = getRandomColor();
      expect(typeof color).toBe("string");
    });

    it("应该返回 STAR_COLORS 数组中的一个颜色", () => {
      const color = getRandomColor();
      expect(STAR_COLORS).toContain(color);
    });

    it("多次调用应该返回不同的颜色（大部分时候）", () => {
      // 测试 100 次，应该至少有一次不同
      const colors = new Set();
      for (let i = 0; i < 100; i++) {
        colors.add(getRandomColor());
      }
      expect(colors.size).toBeGreaterThan(1);
    });
  });

  describe("STAR_COLORS", () => {
    it("应该包含 7 种颜色", () => {
      expect(STAR_COLORS.length).toBe(7);
    });

    it("每个颜色都应该以 # 开头", () => {
      STAR_COLORS.forEach((color) => {
        expect(color.startsWith("#")).toBe(true);
      });
    });

    it("每个颜色都应该是有效的 HEX 格式（7 个字符）", () => {
      STAR_COLORS.forEach((color) => {
        expect(color.length).toBe(7);
      });
    });
  });
});
