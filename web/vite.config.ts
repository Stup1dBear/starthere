/**
 * Vite 配置文件
 *
 * Vite 是什么？
 * - 一个现代前端构建工具（类似 Webpack，但更快）
 * - 开发时：启动一个服务器，支持热更新（改代码自动刷新）
 * - 构建时：打包代码，优化体积，输出可部署的文件
 */

import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  // 插件列表
  plugins: [
    // React 插件：让 Vite 能编译 JSX/TSX 语法
    react(),
  ],

  // 开发服务器配置
  server: {
    port: 3000, // 端口号，访问 http://localhost:3000
    open: true, // 启动时自动打开浏览器
  },

  // 路径别名（可选，方便导入）
  resolve: {
    alias: {
      // 这样就可以用 @/components 代替 ./src/components
      "@": "/src",
    },
  },

  // Vitest 测试配置
  test: {
    // 启用类似 Jest 的全局 API（describe, it, expect 等）
    globals: true,
    // 使用 jsdom 模拟浏览器环境
    environment: "jsdom",
    // 测试文件的设置
    setupFiles: "./src/test/setup.ts",
    // 测试覆盖率配置
    coverage: {
      provider: "v8",
      reporter: ["text", "json", "html"],
    },
  },
});
