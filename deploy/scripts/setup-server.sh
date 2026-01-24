#!/bin/bash
# ===============================================
# 服务器初始化脚本
# ===============================================
#
# 用途：在新的火山引擎 ECS 上执行，安装必要软件
# 执行方式：
#   chmod +x setup-server.sh
#   sudo ./setup-server.sh
#
# ===============================================

set -e  # 遇到错误立即退出

echo "=========================================="
echo "🚀 StartHere 服务器初始化脚本"
echo "=========================================="

# 检查是否为 root
if [ "$EUID" -ne 0 ]; then
    echo "❌ 请使用 sudo 运行此脚本"
    exit 1
fi

# 更新系统
echo "📦 更新系统包..."
apt-get update && apt-get upgrade -y

# 安装 Docker
echo "🐳 安装 Docker..."
if ! command -v docker &> /dev/null; then
    curl -fsSL https://get.docker.com | sh
    systemctl enable docker
    systemctl start docker
    echo "✅ Docker 安装完成"
else
    echo "✅ Docker 已安装"
fi

# 安装 Docker Compose
echo "🐳 安装 Docker Compose..."
if ! command -v docker-compose &> /dev/null; then
    curl -L "https://github.com/docker/compose/releases/latest/download/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
    chmod +x /usr/local/bin/docker-compose
    echo "✅ Docker Compose 安装完成"
else
    echo "✅ Docker Compose 已安装"
fi

# 安装 Git
echo "📦 安装 Git..."
apt-get install -y git

# 创建应用目录
echo "📁 创建应用目录..."
mkdir -p /opt/starthere
chown -R $SUDO_USER:$SUDO_USER /opt/starthere

# 配置防火墙（如果有）
echo "🔥 配置防火墙..."
if command -v ufw &> /dev/null; then
    ufw allow 22    # SSH
    ufw allow 80    # HTTP
    ufw allow 443   # HTTPS
    echo "✅ 防火墙规则已添加"
fi

echo "=========================================="
echo "✅ 服务器初始化完成！"
echo ""
echo "下一步："
echo "1. 克隆代码: git clone https://github.com/Stup1dBear/starthere.git /opt/starthere"
echo "2. 进入目录: cd /opt/starthere"
echo "3. 启动服务: docker-compose up -d --build"
echo "=========================================="
