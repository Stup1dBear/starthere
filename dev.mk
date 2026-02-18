# ===============================================
# StartHere 本地开发 Makefile
# ===============================================
# 使用方法：make -f dev.mk <命令>
# 或设置别名：alias dmake='make -f dev.mk'
# ===============================================

.PHONY: help
help: ## 显示帮助信息
	@echo "StartHere 本地开发命令"
	@echo ""
	@echo "  命令："
	@echo "    make -f dev.mk mysql        - 启动 MySQL"
	@echo "    make -f dev.mk server       - 启动后端"
	@echo "    make -f dev.mk web          - 启动前端"
	@echo "    make -f dev.mk dev          - 启动 MySQL 并提示"
	@echo ""
	@echo "访问地址："
	@echo "  前端: http://localhost:5173"
	@echo "  后端: http://localhost:8080"
	@echo "  MySQL: localhost:3306"

.PHONY: mysql
mysql: ## 启动 MySQL（Docker）
	@echo "启动 MySQL..."
	docker-compose up -d mysql
	@echo "MySQL 已启动"

.PHONY: server
server: ## 启动后端（需要先启动 MySQL）
	@echo "启动后端..."
	cd server && go run ./cmd/api/main.go

.PHONY: web
web: ## 启动前端
	@echo "启动前端..."
	cd web && npm run dev

.PHONY: dev
dev: mysql ## 启动 MySQL 并提示
	@echo ""
	@echo "================================================"
	@echo " MySQL 已启动！"
	@echo "================================================"
	@echo ""
	@echo "接下来请在另外两个终端分别运行："
	@echo ""
	@echo "  终端 1: make -f dev.mk server"
	@echo "  终端 2: make -f dev.mk web"
	@echo ""
	@echo "或手动运行："
	@echo ""
	@echo "  终端 1: cd server && go run ./cmd/api/main.go"
	@echo "  终端 2: cd web && npm run dev"
	@echo ""
