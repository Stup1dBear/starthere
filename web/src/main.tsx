/**
 * main.tsx - 应用入口文件
 *
 * 这个文件的唯一职责：把 React 应用挂载到 DOM
 *
 * 类比 C/C++：这就像 main() 函数
 * 类比 Go：这就像 func main()
 */

// React 核心库
import React from "react";

// ReactDOM 是 React 和浏览器 DOM 之间的桥梁
// createRoot 是 React 18 的新 API（比老的 ReactDOM.render 性能更好）
import ReactDOM from "react-dom/client";

// 导入根组件
import App from "./App";

// 导入全局样式
import "./index.css";

// 获取 HTML 中的挂载点
const rootElement = document.getElementById("root");

// 类型检查：确保元素存在
if (!rootElement) {
  throw new Error("找不到 root 元素，请检查 index.html");
}

// 创建 React 根节点并渲染应用
ReactDOM.createRoot(rootElement).render(
  // StrictMode 是开发辅助工具，会额外检查潜在问题
  // 生产环境会自动移除，不影响性能
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
