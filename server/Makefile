# ===============================================
# StartHere Backend Makefile
# ===============================================

# Go parameters
GOCMD=go
GOBUILD=$(GOCMD) build
GOCLEAN=$(GOCMD) clean
GOTEST=$(GOCMD) test
GOGET=$(GOCMD) get
GOMOD=$(GOCMD) mod
BINARY_NAME=main
BINARY_UNIX=$(BINARY_NAME)_unix

# Default target
.PHONY: all
all: test build

# Build the application
.PHONY: build
build:
	$(GOBUILD) -o $(BINARY_NAME) -v ./cmd/api

# Run all tests
.PHONY: test
test:
	$(GOTEST) -v ./...

# Run tests with coverage
.PHONY: test-coverage
test-coverage:
	$(GOTEST) -v -coverprofile=coverage.out ./...
	$(GOCMD) tool cover -html=coverage.out

# Run go vet
.PHONY: vet
vet:
	$(GOCMD) vet ./...

# Clean build artifacts
.PHONY: clean
clean:
	$(GOCLEAN)
	rm -f $(BINARY_NAME)
	rm -f $(BINARY_UNIX)
	rm -f coverage.out

# Download dependencies
.PHONY: deps
deps:
	$(GOMOD) download
	$(GOMOD) tidy

# Build Docker image
.PHONY: docker-build
docker-build:
	docker build -t starthere/server .

# Local development with docker-compose
.PHONY: docker-up
docker-up:
	cd .. && docker-compose up -d

.PHONY: docker-down
docker-down:
	cd .. && docker-compose down

.PHONY: docker-logs
docker-logs:
	cd .. && docker-compose logs -f server

.PHONY: help
help:
	@echo "StartHere Backend - 可用命令："
	@echo ""
	@echo "  开发命令："
	@echo "    make build          - 构建应用"
	@echo "    make test           - 运行测试"
	@echo "    make test-coverage  - 运行带覆盖率的测试"
	@echo "    make vet            - 运行 go vet"
	@echo "    make deps           - 下载依赖"
	@echo "    make clean          - 清理构建文件"
	@echo ""
	@echo "  Docker 命令："
	@echo "    make docker-build   - 构建 Docker 镜像"
	@echo "    make docker-up      - 启动 docker-compose"
	@echo "    make docker-down    - 停止 docker-compose"
	@echo "    make docker-logs    - 查看服务日志"
