# Background Agents 环境配置

## 📋 概述

本配置为跨境运营助手项目设置了优化的background agents运行环境，支持自动化开发、测试和部署流程。

## 🏗️ 环境架构

### 基础环境
- **操作系统**: Ubuntu (最新LTS版本)
- **用户**: ubuntu
- **基础工具**: Python3, Node.js, Git, HTTP服务器

### 开发服务器配置
- **主服务器**: http://localhost:8080 (http-server，支持CORS)
- **热重载服务器**: http://localhost:8081 (live-server，文件变化自动刷新)
- **监控面板**: 终端显示系统状态

## 🔧 配置文件说明

### environment.json
```json
{
  "user": "ubuntu",                    // 系统用户
  "install": "./.cursor/install.sh",   // 安装脚本路径
  "start": "...",                      // 启动命令
  "terminals": [...]                   // 终端会话配置
}
```

### install.sh
- 更新系统包管理器
- 安装开发工具 (Python3, Node.js, npm)
- 安装HTTP服务器工具
- 配置项目权限
- 验证安装结果

## 🚀 启动流程

1. **机器初始化**: 从Ubuntu基础镜像开始
2. **依赖安装**: 运行 `install.sh` 安装必要工具
3. **环境启动**: 执行启动命令，显示环境状态
4. **服务启动**: 并行启动三个终端会话：
   - `dev-server`: HTTP开发服务器
   - `live-reload`: 热重载服务器  
   - `monitor`: 系统状态监控

## 🔍 终端会话详解

### dev-server 终端
- **端口**: 8080
- **功能**: 静态文件服务，支持CORS
- **特性**: 禁用缓存，便于开发调试
- **访问**: http://localhost:8080

### live-reload 终端  
- **端口**: 8081
- **功能**: 带热重载的开发服务器
- **特性**: 文件变化时自动刷新浏览器
- **访问**: http://localhost:8081

### monitor 终端
- **功能**: 项目状态监控
- **频率**: 每分钟显示一次状态
- **内容**: 时间戳 + 系统状态 + 服务状态

## 🛠️ 本地测试

测试environment.json配置：
```bash
# 测试安装脚本
./.cursor/install.sh

# 手动启动服务验证
npx http-server -p 8080 -c-1 --cors
npx live-server --port=8081 --no-browser
```

## 📊 性能监控

### 资源使用
- **内存**: 轻量级配置，基础内存需求 < 1GB
- **CPU**: 低CPU占用，适合长时间运行
- **网络**: 本地服务，无外部网络依赖

### 日志记录
- 终端输出包含时间戳和状态信息
- 错误信息自动显示在相应终端
- 可通过tmux查看所有会话状态

## 🔧 故障排除

### 常见问题

**Q: 端口被占用？**
```bash
# 检查端口占用
lsof -i :8080
lsof -i :8081

# 杀死占用进程
sudo kill -9 <PID>
```

**Q: 安装脚本执行失败？**
```bash
# 检查脚本权限
ls -la .cursor/install.sh

# 重新设置权限
chmod +x .cursor/install.sh
```

**Q: 服务器无法启动？**
```bash
# 手动测试Python服务器
python3 -m http.server 8080

# 检查Node.js工具安装
npm list -g http-server live-server
```

## 🚀 扩展配置

### 添加新服务
在 `environment.json` 的 `terminals` 数组中添加新配置：

```json
{
  "name": "新服务名",
  "command": "cd . && 你的命令",
  "description": "服务描述"
}
```

### 修改端口
修改相应终端的命令中的端口参数：
- dev-server: `-p 8080` → `-p 新端口`
- live-reload: `--port=8081` → `--port=新端口`

## 📚 相关资源

- [Cursor Background Agents 文档](https://docs.cursor.com/features/background-agents)
- [tmux 使用指南](https://github.com/tmux/tmux/wiki)
- [http-server 文档](https://www.npmjs.com/package/http-server)
- [live-server 文档](https://www.npmjs.com/package/live-server)

---

*配置文件版本: v1.0.0*  
*最后更新: $(date)*  
*维护者: 跨境运营助手开发团队* 