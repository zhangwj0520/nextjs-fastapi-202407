# Nextjs-FastAPI

## FastAPI 后端
此项目是使用FastAPI构建的后端，用于提供API服务。

### 安装

1. 安装mysqlclient失败

```zsh
# Assume you are activating Python 3 venv
brew install mysql-client pkg-config
export PKG_CONFIG_PATH="$(brew --prefix)/opt/mysql-client/lib/pkgconfig"
export PKG_CONFIG_PATH="/opt/homebrew/opt/mysql-client/lib/pkgconfig"
pipx install mysqlclient
```

### prisma

1. prisma db push 同步数据库

2. 前端集成

```zsh
pnpm exec prisma migrate dev # 链接数据库,生成客户端
pnpm exec prisma generate # 可以再次生成客户端

pnpm exec prisma migrate dev # 更改时再次执行
```




## 问题
###  1.停止端口

```zsh
lsof -i :9100
kill -9 <PID>
```

