# ===============================================
# StartHere Web 前端 Dockerfile
# ===============================================
# 
# Docker 镜像构建分两阶段：
# 1. Build 阶段：安装依赖、编译 TypeScript、打包
# 2. Production 阶段：只保留编译后的静态文件
#
# 为什么分阶段？
# - 减小镜像体积（不包含 node_modules）
# - 生产环境更安全（不暴露源码和开发依赖）
# ===============================================

# ========== 阶段 1: 构建 ==========
# 使用 Node.js 官方镜像作为基础
# alpine 是精简版 Linux，体积小
FROM node:20-alpine AS builder

# 设置工作目录（容器内的路径）
WORKDIR /app

# 先复制 package.json 和 lock 文件
# 为什么单独复制？利用 Docker 缓存层
# 如果 package.json 没变，下次构建会跳过 npm install
COPY package*.json ./

# 安装依赖
RUN npm ci
# npm ci vs npm install:
# - ci 更严格，完全按照 lock 文件安装
# - 更快、更适合 CI/CD 环境

# 复制源代码
COPY . .

# 执行构建，生成静态文件到 dist/ 目录
RUN npm run build

# ========== 阶段 2: 生产环境 ==========
# 使用 Nginx 作为静态文件服务器
FROM nginx:alpine

# 复制自定义 Nginx 配置
COPY nginx.conf /etc/nginx/conf.d/default.conf

# 从 builder 阶段复制构建产物
# --from=builder 表示从上一个阶段获取文件
COPY --from=builder /app/dist /usr/share/nginx/html

# 暴露 80 端口（文档作用，实际端口映射在 docker-compose 中配置）
EXPOSE 80

# Nginx 默认会自动启动，无需指定 CMD
