# 🌟 StartHere - 星辰目标管理

> "每一个目标都是你宇宙中的一颗星星，完成它，点亮它。"

## 项目简介

StartHere 是一个跨端（Web、iOS、Android）的目标管理应用，以宇宙探索为主题，让目标管理变得有趣。

## 技术栈

| 模块     | 技术                      | 说明             |
| -------- | ------------------------- | ---------------- |
| 前端 Web | React + TypeScript + Vite | 现代前端工具链   |
| 移动端   | React Native (后续)       | 跨 iOS/Android   |
| 后端     | Go + Gin                  | 高性能 API 服务  |
| 数据库   | MySQL/PostgreSQL          | 火山引擎云数据库 |
| 部署     | Docker + Nginx            | 容器化部署       |

## 项目结构

```
starthere/
├── web/                 # React 前端项目
│   ├── src/
│   │   ├── components/  # 可复用组件
│   │   ├── pages/       # 页面组件
│   │   ├── hooks/       # 自定义 Hooks
│   │   ├── services/    # API 调用
│   │   ├── stores/      # 状态管理
│   │   └── styles/      # 样式文件
│   └── package.json
├── server/              # Go 后端项目
│   ├── cmd/             # 入口文件
│   ├── internal/        # 内部包（不对外暴露）
│   │   ├── handler/     # HTTP 处理器
│   │   ├── service/     # 业务逻辑
│   │   ├── repository/  # 数据库操作
│   │   └── model/       # 数据模型
│   ├── pkg/             # 公共工具包
│   └── go.mod
├── deploy/              # 部署配置
│   ├── docker/
│   └── nginx/
├── docs/                # 文档
└── scripts/             # 脚本工具
```

## 快速开始

### 开发环境依赖

- Git
- Go 1.21+
- Node.js 20+（包含 `npm`）
- Docker Desktop（提供 `docker` 和 `docker compose`，用于本地 MySQL 或整套本地环境）
- `make`（macOS 自带，推荐使用）

先检查本机环境：

```bash
make doctor
```

### 前端开发

```bash
cd web
npm ci
npm run dev
```

### 后端开发

```bash
cd server
go mod tidy
go run ./cmd/api/main.go
```

### 本地完整环境

```bash
docker compose up -d
```

## 学习笔记

在开发过程中，重要的最佳实践会记录在 `docs/` 目录下。

---

🚀 Let's start here, and reach for the stars!
