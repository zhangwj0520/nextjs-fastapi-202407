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

1. 将现有数据库配置生成prisma

   ```zsh
   prisma db pull
   ```
  
2. 

3. prisma db push 同步数据库
4. prisma

```zsh
 prisma migrate dev
 prisma generate

```

阿里 DATABASE_URL="postgresql://postgres:Qwer1234@localhost:20243/app"

## 问题
###  1.停止端口

```zsh
lsof -i :9100
kill -9 <PID>
```


