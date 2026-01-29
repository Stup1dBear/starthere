# 🌟 前端设计文档 (Frontend Design)

## 1. 核心概念 (Core Concepts)

- **Star (星星)**: 代表一个目标 (Goal)。
- **Milestone (里程碑)**: 围绕星星运行的轨道/行星，代表目标的具体步骤。
- **Galaxy (星系)**: 所有目标的集合。

## 2. 数据结构 (Data Structure)

```typescript
interface Goal {
  id: string;
  title: string; // 目标名称
  description: string; // 目标描述
  status: "active" | "completed";
  color: string; // 星星颜色
  milestones: Milestone[];
}

interface Milestone {
  id: string;
  title: string;
  isCompleted: boolean;
}
```

## 3. 组件设计 (Component Design)

- **App**: 根组件，负责布局和星空背景。
- **StarBackground**: 纯 CSS 动画实现的星空背景。
- **GoalCard**: 核心交互组件。
  - **折叠状态**: 显示星星图标、标题、进度条。
  - **展开状态**: 显示详细描述、里程碑列表。
  - **编辑模式**: 允许修改标题和描述。
  - **里程碑操作**: 添加、删除、编辑、勾选完成。
- **CreateGoalDialog**: 创建新目标的表单。

## 4. 状态管理 (State Management)

使用 `zustand` + `persist` 中间件：

- 自动保存数据到 LocalStorage。
- 提供 CRUD 操作：`addGoal`, `removeGoal`, `updateGoal`, `toggleGoalStatus` 等。

## 5. 视觉风格 (Visual Style)

- **MUI Theme**: Dark Mode (深色模式)。
- **配色**: 深蓝/黑色背景 (#0B0D17)，高亮色 (#90caf9)，星星自定义颜色。
- **特效**: 阴影发光 (Box Shadow Glow)，卡片磨砂玻璃效果 (Backdrop Filter)。

## 6. 后续计划

- [ ] 3D 星空效果 (使用 Three.js/React-Three-Fiber)。
- [ ] 目标分类 (不同颜色的星星代表不同类别)。
- [ ] 数据同步到后端。
