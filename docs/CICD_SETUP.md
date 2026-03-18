# GitHub Actions CI/CD 配置指南

> 当前部署工作流支持 `production` 自动部署，以及手动触发 `staging` 或 `production` 部署。

---

## 📋 前置条件检查

- [x] 服务器已安装 Docker
- [ ] 已生成 GitHub Actions 使用的 SSH 密钥
- [ ] GitHub 已创建 `production` 和 `staging` 两个 Environments
- [ ] 两个 Environment 都已配置所需 secrets
- [ ] `staging` 已准备独立数据库和访问入口

---

## 🔑 步骤 1: 生成 SSH 密钥对（如果还没有）

在本地执行：

```bash
ssh-keygen -t ed25519 -C "github-actions" -f ~/.ssh/github_actions_key
cat ~/.ssh/github_actions_key.pub
```

把公钥加到服务器：

```bash
ssh-copy-id -i ~/.ssh/github_actions_key.pub root@115.191.33.64
```

验证：

```bash
ssh -i ~/.ssh/github_actions_key root@115.191.33.64
```

---

## 🔐 步骤 2: 创建 GitHub Environments

1. 打开仓库页面
2. 进入 **Settings** → **Environments**
3. 创建两个 environments：
   - `production`
   - `staging`

这两个 environment 使用**同名 secret**，但值可以不同。

---

## 🧾 步骤 3: 配置必需 Secrets

在 `staging` 中配置以下 secrets：

- `DEPLOY_KEY`
- `DB_PASSWORD`
- `JWT_SECRET`
- `SMTP_PASS`
- `SMOKE_TEST_EMAIL`（staging 深度 smoke test 必需）
- `SMOKE_TEST_PASSWORD`（staging 深度 smoke test 必需）

在 `production` 中配置以下 secrets：

- `DEPLOY_KEY`
- `DB_PASSWORD`
- `JWT_SECRET`
- `SMTP_PASS`

说明：

- `production` 和 `staging` 可以使用同一台主机，但不能共用数据库
- `staging` 建议使用单独的 `JWT_SECRET`
- `staging` 第一阶段建议 `EMAIL_DRIVER=log`
- `production` 默认只跑 `basic` smoke checks，不需要 smoke 测试账号
- `staging` 固定跑 `basic + deep` smoke checks，因此必须提供 smoke 测试账号

获取私钥内容：

```bash
cat ~/.ssh/github_actions_key
```

---

## ⚙️ 步骤 4: 配置可选 Environment Variables

在 GitHub Environment 中配置以下变量：

- `DEPLOY_HOST`
- `DEPLOY_USER`
- `DB_HOST`
- `DB_PORT`
- `DB_USER`
- `DB_NAME`
- `EMAIL_DRIVER`
- `EMAIL_FROM_ADDRESS`
- `EMAIL_FROM_NAME`
- `SMTP_HOST`
- `SMTP_PORT`
- `SMTP_USER`
- `FRONTEND_URL`

- `IMAGE_TAG`
- `WEB_CONTAINER_NAME`
- `SERVER_CONTAINER_NAME`
- `WEB_PORT`
- `SERVER_PORT`
- `WEB_PUBLIC_URL`
- `API_BASE_URL`

推荐的 `staging` 默认值：

```text
DEPLOY_HOST=115.191.33.64
DEPLOY_USER=root
DB_HOST=192.168.1.20
DB_PORT=3306
DB_USER=star-there-server-staging
DB_NAME=star-there-staging
EMAIL_DRIVER=log
EMAIL_FROM_ADDRESS=no-reply@star-there.com
EMAIL_FROM_NAME=StarThereStaging
SMTP_HOST=smtpdm.aliyun.com
SMTP_PORT=80
SMTP_USER=no-reply@star-there.com
FRONTEND_URL=https://staging.star-there.com
IMAGE_TAG=staging-latest
WEB_CONTAINER_NAME=starthere-web-staging
SERVER_CONTAINER_NAME=starthere-server-staging
WEB_PORT=8081
SERVER_PORT=18080
WEB_PUBLIC_URL=https://staging.star-there.com
API_BASE_URL=https://staging.star-there.com/api/v1
```

推荐的 `production` 默认值：

```text
DEPLOY_HOST=115.191.33.64
DEPLOY_USER=root
DB_HOST=192.168.1.20
DB_PORT=3306
DB_USER=star-there-server
DB_NAME=star-there
EMAIL_DRIVER=smtp
EMAIL_FROM_ADDRESS=no-reply@star-there.com
EMAIL_FROM_NAME=StarThere
SMTP_HOST=smtpdm.aliyun.com
SMTP_PORT=80
SMTP_USER=no-reply@star-there.com
FRONTEND_URL=https://star-there.com
IMAGE_TAG=latest
WEB_CONTAINER_NAME=starthere-web
SERVER_CONTAINER_NAME=starthere-server
WEB_PORT=80
SERVER_PORT=8080
WEB_PUBLIC_URL=https://star-there.com
API_BASE_URL=https://star-there.com/api/v1
```

---

## 📦 步骤 5: 镜像仓库权限

如果 GHCR 镜像是私有的，服务器需要能登录 `ghcr.io` 拉取镜像。

如果想降低复杂度，首次可以把相关包设为 public。

---

## ✅ 步骤 6: 验证配置

### 6.1 检查 Environments

进入 **Settings** → **Environments**，确认存在：

- `production`
- `staging`

并且每个 environment 都配置了上面的 secrets 和 variables。

### 6.2 触发 Production 部署

推送到 `main`：

```bash
git add .
git commit -m "feat: update production"
git push origin main
```

### 6.3 触发 Staging 部署

1. 打开 **Actions**
2. 选择 **Deploy**
3. 点击 **Run workflow**
4. `environment` 选 `staging`
5. `ref` 选要部署的分支或 commit
6. 运行

### 6.4 查看部署结果

期望看到：

- 后端 `go vet` 和测试通过
- 前端 `lint`、`test:run`、`build` 通过
- 镜像构建成功
- 数据库 migrations 执行成功
- 目标环境部署成功
- smoke checks 通过

---

## 🚀 当前工作流行为

### Production

- 触发方式：推送到 `main`
- 目标：`production` environment
- 镜像标签：默认 `latest`
- 部署前置条件：前后端校验都必须通过
- smoke profile：`basic`
- 数据库策略：deploy 前显式执行 migrations，应用容器禁用 `AutoMigrate`

### Staging

- 触发方式：手动 `workflow_dispatch`
- 目标：`staging` environment
- 镜像标签：默认 `staging-latest`
- 部署前置条件：前后端校验都必须通过
- smoke profile：`basic + deep`
- 数据库策略：deploy 前显式执行 migrations，应用容器禁用 `AutoMigrate`

---

## 🔍 Smoke Checks

当前 workflow 在远端部署后会执行最小 smoke checks：

- `curl http://127.0.0.1:$SERVER_PORT/health`
- `curl http://127.0.0.1:$WEB_PORT/`

在 GitHub Actions runner 上还会执行公网 smoke checks：

- 基础检查
  - `WEB_URL/` 返回 200
  - `API_BASE_URL/health` 返回 200 且 `success=true`
- 深度检查
  - 登录成功
  - `GET /auth/me` 成功
  - 创建 goal 成功
  - 列出 goals 成功
  - 删除刚创建的 goal 成功

显式规则：

- `staging` 固定运行 `basic + deep`
- `production` 固定运行 `basic`
- `staging` 缺少 `SMOKE_TEST_EMAIL` 或 `SMOKE_TEST_PASSWORD` 会直接失败，而不是跳过 deep

## 🗃 数据库迁移流程

当前仓库使用显式 migration workflow：

- migration 文件位于 `server/migrations/`
- 通过 `go run ./cmd/migrate ...` 或 `server/Makefile` 中的 migration 命令执行
- staging / production deploy 前会先运行 migration，再启动后端容器
- staging / production 后端容器设置 `DB_AUTO_MIGRATE=false`
- local/dev 默认仍可使用 `DB_AUTO_MIGRATE=true` 降低开发摩擦

### 一次性基线步骤（现有 staging / production 必做）

因为历史环境之前依赖 `AutoMigrate()`，不是从 `schema_migrations` 起步，所以第一次切换到显式 migration 前，必须先建立基线。

在确认现有数据库结构已经覆盖 `001_init_schema.up.sql` 之后，执行：

```bash
cd server
DB_HOST=127.0.0.1 \
DB_PORT=13306 \
DB_USER=<db_user> \
DB_PASSWORD=<db_password> \
DB_NAME=<db_name> \
go run ./cmd/migrate baseline 1
```

验证：

```bash
cd server
DB_HOST=127.0.0.1 \
DB_PORT=13306 \
DB_USER=<db_user> \
DB_PASSWORD=<db_password> \
DB_NAME=<db_name> \
go run ./cmd/migrate version
```

只有 baseline 完成后，后续 deploy 中的自动 migration 才会正常工作。

这让部署验证分成两层：

- 远端本机检查：确认容器起来了
- 公网 smoke checks：确认真实入口和核心链路可用

---

## 🔧 常见问题排查

### Q1: `Permission denied (publickey)`

检查：

- `DEPLOY_KEY` 是否完整
- 服务器是否已加公钥
- 本地 SSH 是否可连通

### Q2: staging 前端打到了 production API

检查：

- `staging` environment 的 `API_BASE_URL`
- 前端镜像是否用 staging workflow 重新构建

### Q3: staging 和 production 容器冲突

检查：

- `WEB_CONTAINER_NAME`
- `SERVER_CONTAINER_NAME`
- `WEB_PORT`
- `SERVER_PORT`

### Q4: staging 写进了 production 数据

检查：

- `staging` environment 的数据库 secrets 是否独立
- 后端 `FRONTEND_URL` 和数据库配置是否都来自 staging environment

---

## 📝 当前已知限制

- 目前 CI 仍主要保护后端测试，前端 lint/test gate 还需要后续补齐
- 后端仍在启动时执行 `AutoMigrate`，这不符合最终的受控 migration 流程
- staging 目前是“最小可用形态”，不是完整平台化环境
