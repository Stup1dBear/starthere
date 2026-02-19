# ===============================================
# StartHere Makefile
# ===============================================
#
# 常用命令：
#   make build-web          - 构建前端 Docker 镜像
#   make build-server       - 构建后端 Docker 镜像
#   make build-all          - 构建所有镜像
#   make up                 - 启动本地开发环境
#   make down               - 停止本地开发环境
#   make deploy-web         - 部署前端到服务器
#   make deploy-server      - 部署后端到服务器
#   make deploy-all         - 部署全部到服务器
#   make logs               - 查看本地服务日志
#   make dev-log            - 编辑开发日志
#
# ===============================================

# 配置
PROJECT_NAME := starthere
REGISTRY := ghcr.io
GITHUB_REPO := Stup1dBear/starthere
SERVER_HOST := star-there-ecs-001
SERVER_USER := root

# 镜像名称（小写）
IMAGE_WEB := $(REGISTRY)/$(shell echo $(GITHUB_REPO) | tr '[:upper:]' '[:lower:]')/web
IMAGE_SERVER := $(REGISTRY)/$(shell echo $(GITHUB_REPO) | tr '[:upper:]' '[:lower:]')/server

# 默认目标
.PHONY: help
help:
	@echo "StartHere Makefile - 可用命令："
	@echo ""
	@echo "  测试命令："
	@echo "    make test-web           - 运行前端测试"
	@echo "    make test-server        - 运行后端测试"
	@echo "    make test-all           - 运行所有测试"
	@echo "    make test-web-ui        - 运行前端测试 UI"
	@echo "    make test-web-coverage  - 生成前端测试覆盖率"
	@echo ""
	@echo "  构建命令："
	@echo "    make build-web          - 构建前端 Docker 镜像"
	@echo "    make build-server       - 构建后端 Docker 镜像"
	@echo "    make build-all          - 构建所有镜像"
	@echo ""
	@echo "  本地开发："
	@echo "    make up                 - 启动本地开发环境"
	@echo "    make down               - 停止本地开发环境"
	@echo "    make logs               - 查看服务日志"
	@echo "    make restart            - 重启本地服务"
	@echo ""
	@echo "  开发日志："
	@echo "    make dev-log            - 编辑开发日志"
	@echo ""
	@echo "  部署命令："
	@echo "    make push-web           - 推送前端镜像到 GHCR"
	@echo "    make push-server        - 推送后端镜像到 GHCR"
	@echo "    make deploy-web         - 部署前端到服务器"
	@echo "    make deploy-server      - 部署后端到服务器"
	@echo "    make deploy-all         - 部署全部到服务器"
	@echo ""
	@echo "  服务器管理："
	@echo "    make ssh                - SSH 连接到服务器"
	@echo "    make server-logs        - 查看服务器上的服务日志"

# ===============================================
# 构建命令
# ===============================================

.PHONY: build-web
build-web:
	@echo "构建前端镜像..."
	docker build --platform linux/amd64 -t $(IMAGE_WEB):latest ./web
	@echo "前端镜像构建完成: $(IMAGE_WEB):latest"

.PHONY: build-server
build-server:
	@echo "构建后端镜像..."
	docker build --platform linux/amd64 -t $(IMAGE_SERVER):latest ./server
	@echo "后端镜像构建完成: $(IMAGE_SERVER):latest"

.PHONY: build-all
build-all: build-web build-server
	@echo "所有镜像构建完成"

# ===============================================
# 本地开发
# ===============================================

.PHONY: up
up:
	@echo "启动本地开发环境..."
	docker-compose up -d
	@echo "服务已启动"
	@echo "  前端: http://localhost"
	@echo "  后端: http://localhost:8080"
	@echo "  MySQL: localhost:3306"

.PHONY: down
down:
	@echo "停止本地开发环境..."
	docker-compose down
	@echo "服务已停止"

.PHONY: logs
logs:
	docker-compose logs -f

.PHONY: restart
restart: down up

# ===============================================
# 镜像推送
# ===============================================

.PHONY: push-web
push-web: build-web
	@echo "推送前端镜像到 GHCR..."
	docker push $(IMAGE_WEB):latest
	@echo "前端镜像已推送"

.PHONY: push-server
push-server: build-server
	@echo "推送后端镜像到 GHCR..."
	docker push $(IMAGE_SERVER):latest
	@echo "后端镜像已推送"

.PHONY: push-all
push-all: push-web push-server
	@echo "所有镜像已推送"

# ===============================================
# 部署命令
# ===============================================

.PHONY: login-ghcr
login-ghcr:
	@echo "请先登录 GHCR (使用 GitHub Personal Access Token):"
	@echo "访问 https://github.com/settings/tokens 创建 token (需要 write:packages 权限)"
	@read -p "GitHub 用户名: " user; \
	read -s -p "GitHub Token: " token; \
	echo; \
	docker login ghcr.io -u $$user -p $$token

.PHONY: deploy-web
deploy-web: push-web
	@echo "部署前端到服务器 $(SERVER_HOST)..."
	ssh $(SERVER_USER)@$(SERVER_HOST) 'bash -s' << 'ENDSSH'
		IMAGE_NAME="$(IMAGE_WEB):latest"
		echo; echo "登录 GHCR...";
		read -p "GitHub 用户名: " user;
		read -s -p "GitHub Token: " token;
		echo; echo;
		echo "$$token" | docker login ghcr.io -u "$$user" --password-stdin;
		echo;
		echo "拉取最新镜像...";
		docker pull "$(IMAGE_WEB):latest";
		echo;
		echo "停止旧容器...";
		docker stop starthere-web || true;
		docker rm starthere-web || true;
		echo;
		echo "启动新容器...";
		docker run -d \
			--name starthere-web \
			--restart unless-stopped \
			-p 80:80 \
			"$(IMAGE_WEB):latest";
		echo;
		echo "清理...";
		docker image prune -f;
		docker logout ghcr.io;
		echo;
		docker ps | grep starthere-web;
		echo;
		echo "✅ 前端部署完成";
ENDSSH
	@echo; echo "🌐 访问: https://star-there.com";

.PHONY: deploy-server
deploy-server: push-server
	@echo "部署后端到服务器 $(SERVER_HOST)..."
	ssh $(SERVER_USER)@$(SERVER_HOST) 'bash -s' << 'ENDSSH'
		IMAGE_NAME="$(IMAGE_SERVER):latest"
		echo; echo "登录 GHCR...";
		read -p "GitHub 用户名: " user;
		read -s -p "GitHub Token: " token;
		echo; echo;
		echo "$$token" | docker login ghcr.io -u "$$user" --password-stdin;
		echo;
		echo "拉取最新镜像...";
		docker pull "$(IMAGE_SERVER):latest";
		echo;
		echo "停止旧容器...";
		docker stop starthere-server || true;
		docker rm starthere-server || true;
		echo;
		echo "启动新容器...";
		# 注意：需要先在服务器上配置 .env 文件或环境变量
		docker run -d \
			--name starthere-server \
			--restart unless-stopped \
			-p 8080:8080 \
			-e SERVER_PORT=8080 \
			-e GIN_MODE=release \
			-e DB_HOST=115.190.247.147 \
			-e DB_PORT=3306 \
			-e DB_USER=starthere \
			-e DB_PASSWORD=your_password_here \
			-e DB_NAME=starthere \
			-e JWT_SECRET=your_super_secret_jwt_key_here \
			-e JWT_EXPIRY_HOURS=24 \
			"$(IMAGE_SERVER):latest";
		echo;
		echo "清理...";
		docker image prune -f;
		docker logout ghcr.io;
		echo;
		docker ps | grep starthere-server;
		echo;
		echo "✅ 后端部署完成";
ENDSSH
	@echo; echo "🌐 后端 API: http://$(SERVER_HOST):8080";

.PHONY: deploy-all
deploy-all: deploy-web deploy-server
	@echo; echo "✅ 全部部署完成！";

# ===============================================
# 服务器管理
# ===============================================

.PHONY: ssh
ssh:
	ssh $(SERVER_USER)@$(SERVER_HOST)

.PHONY: server-logs
server-logs:
	ssh $(SERVER_USER)@$(SERVER_HOST) 'docker logs -f starthere-web || true; docker logs -f starthere-server || true'

# ===============================================
# 测试命令
# ===============================================

.PHONY: test-web
test-web:
	@echo "运行前端测试..."
	cd web && npm test

.PHONY: test-web-ui
test-web-ui:
	@echo "运行前端测试 UI..."
	cd web && npm run test:ui

.PHONY: test-web-coverage
test-web-coverage:
	@echo "生成前端测试覆盖率..."
	cd web && npm run test:coverage

.PHONY: test-server
test-server:
	@echo "运行后端测试..."
	cd server && make test

.PHONY: test-all
test-all: test-web test-server
	@echo "所有测试运行完成！"

# ===============================================
# 开发日志
# ===============================================

.PHONY: dev-log
dev-log:
	@echo "打开开发日志..."
	"$$EDITOR" docs/DEV_LOG.md || vim docs/DEV_LOG.md || nano docs/DEV_LOG.md || open docs/DEV_LOG.md
	@echo "开发日志已更新，别忘了提交！"

