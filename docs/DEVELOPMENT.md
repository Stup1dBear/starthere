# 开发流程规范

## 目录
- [本地开发环境配置](#本地开发环境配置)
- [Git 工作流程](#git-工作流程)
- [CI/CD 部署流程](#cicd-部署流程)

---

## 本地开发环境配置

### 前置要求
- Docker Desktop
- Go 1.21+
- Node.js 18+

### 方式一：推荐（分别启动，支持热重载）

#### 1. 启动 MySQL
```bash
docker-compose up -d mysql
```

#### 2. 启动后端（新终端）
```bash
cd server
go run ./cmd/api/main.go
```

#### 3. 启动前端（新终端）
```bash
cd web
npm run dev
```

### 方式二：Docker Compose（完整环境）
```bash
# 启动所有服务
docker-compose up -d

# 查看日志
docker-compose logs -f

# 停止服务
docker-compose down
```

### 访问地址
| 服务 | 地址 |
|------|------|
| 前端 | http://localhost:5173 |
| 后端 API | http://localhost:8080 |
| 健康检查 | http://localhost:8080/health |

### 配置文件
后端使用 `server/.env` 文件配置环境变量：
- `SERVER_PORT`: 后端端口（默认 8080）
- `DB_HOST`: 数据库地址
- `DB_USER`: 数据库用户名
- `DB_PASSWORD`: 数据库密码
- `DB_NAME`: 数据库名
- `JWT_SECRET`: JWT 密钥

---

## Git 工作流程

### 分支策略
- `main`: 主分支，用于生产部署，**只接受合并请求**
- `feature/*`: 功能开发分支
- `fix/*`: Bug 修复分支
- `hotfix/*`: 紧急修复分支

### 开发流程

#### 1. 创建功能分支
```bash
# 从 main 创建新分支
git checkout main
git pull origin main
git checkout -b feature/your-feature-name
```

#### 2. 开发并提交
```bash
# 编写代码...

# 提交修改
git add .
git commit -m "feat: 添加某某功能"
```

#### 3. 推送到远程
```bash
git push origin feature/your-feature-name
```

#### 4. 创建 Pull Request
- 在 GitHub 上创建 Pull Request
- 填写描述，关联相关 Issue
- 等待代码审查

#### 5. 合并到 main
- PR 审查通过后，合并到 main 分支
- **合并到 main 会自动触发 CI/CD 部署到生产环境**

#### 6. 清理分支
```bash
# 删除本地分支
git checkout main
git branch -d feature/your-feature-name

# 删除远程分支
git push origin --delete feature/your-feature-name
```

### 提交信息规范
使用约定式提交格式：
- `feat: 新功能`
- `fix: 修复 bug`
- `docs: 文档更新`
- `style: 代码格式调整`
- `refactor: 重构`
- `test: 测试相关`
- `chore: 构建/工具相关`

---

## CI/CD 部署流程

### 自动触发
- 推送代码到 `main` 分支自动触发部署
- 也可以在 GitHub Actions 手动触发部署

### 部署流程
1. **测试阶段**: 运行 Go 测试和前端测试
2. **构建阶段**: 构建 Docker 镜像（linux/amd64）
3. **推送阶段**: 推送镜像到 GitHub Container Registry (ghcr.io)
4. **部署阶段**: SSH 到生产服务器，拉取新镜像并重启容器

### 监控部署
- 查看 GitHub Actions 日志：仓库 → Actions
- 查看服务器状态：
  ```bash
  # SSH 到服务器
  ssh star-there-ecs-001

  # 查看容器
  docker ps

  # 查看日志
  docker logs -f starthere-web
  docker logs -f starthere-server
  ```

### 生产环境访问
- 前端: https://star-there.com
- 后端: https://star-there.com/api/v1

---

## 常用命令速查

### Git
```bash
# 创建新分支
git checkout -b feature/xxx

# 切换分支
git checkout main

# 查看分支
git branch -a

# 合并 main 最新代码
git checkout feature/xxx
git merge main
```

### Docker
```bash
# 启动 MySQL
docker-compose up -d mysql

# 查看运行中的容器
docker ps

# 查看日志
docker-compose logs -f

# 停止所有服务
docker-compose down
```

### 后端开发
```bash
cd server

# 运行后端
go run ./cmd/api/main.go

# 运行测试
make test

# 代码检查
go vet ./...
```

### 前端开发
```bash
cd web

# 安装依赖
npm install

# 启动开发服务器
npm run dev

# 构建
npm run build

# 运行测试
npm test
```
