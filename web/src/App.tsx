/**
 * App.tsx - 根组件
 *
 * React 核心概念：组件 (Component)
 * - 组件是 UI 的独立、可复用的单元
 * - 每个组件是一个函数，返回要显示的内容（JSX）
 * - 组件名必须大写开头（区分 HTML 标签）
 *
 * JSX 是什么？
 * - 一种语法糖，让你在 JS 中写类似 HTML 的代码
 * - <div>Hello</div> 会被编译成 React.createElement('div', null, 'Hello')
 * - 文件扩展名 .tsx = TypeScript + JSX
 */

import "./App.css";

// 这是一个函数组件（Function Component）
// 函数名就是组件名，必须大写开头
function App() {
  // 函数体可以写任何 JS/TS 逻辑
  const appName = "StartHere";
  const greeting = "欢迎来到星辰目标管理";

  // return 的内容是 JSX，描述这个组件要渲染什么
  return (
    // className 而不是 class（因为 class 是 JS 保留字）
    <div className="app">
      {/* 在 JSX 中用花括号 {} 插入 JS 表达式 */}
      <h1>🌟 {appName}</h1>
      <p>{greeting}</p>

      <div className="card">
        <p>你的第一个 React 应用已经运行起来了！</p>
        <p className="hint">
          编辑 <code>src/App.tsx</code> 并保存，页面会自动更新
        </p>
      </div>

      <footer>🚀 Let's start here, and reach for the stars!</footer>
    </div>
  );
}

// 导出组件，让其他文件可以 import
export default App;
