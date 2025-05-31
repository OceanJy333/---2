#!/bin/bash

# 跨境运营助手 - 环境安装脚本
# 用于background agents环境配置

set -e  # 遇到错误立即退出

echo "🚀 开始配置跨境运营助手开发环境..."

# 更新系统包管理器
echo "📦 更新系统包..."
sudo apt-get update -qq

# 安装基础工具
echo "🔧 安装基础开发工具..."
sudo apt-get install -y \
    curl \
    wget \
    git \
    python3 \
    python3-pip \
    nodejs \
    npm \
    tree \
    htop \
    unzip

# 安装现代化的Python HTTP服务器（如果需要更好的性能）
echo "🐍 配置Python环境..."
python3 -m pip install --user --upgrade pip

# 安装Node.js工具（用于可能的构建任务）
echo "📦 安装Node.js全局工具..."
sudo npm install -g \
    http-server \
    live-server \
    json

# 验证安装
echo "✅ 验证安装结果:"
echo "Python版本: $(python3 --version)"
echo "Node.js版本: $(node --version)"
echo "NPM版本: $(npm --version)"
echo "Git版本: $(git --version)"

# 设置项目权限
echo "🔐 设置项目文件权限..."
chmod +x .cursor/install.sh

# 创建日志目录（如果需要）
mkdir -p logs

echo "✨ 环境配置完成！项目已准备就绪。"
echo "🌐 使用以下命令启动开发服务器："
echo "   - Python: python3 -m http.server 8080"
echo "   - Node.js: npx http-server -p 8080"
echo "   - Live Server: npx live-server --port=8080" 