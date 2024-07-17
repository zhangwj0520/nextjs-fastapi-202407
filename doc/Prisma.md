# Prisma

## 命令

```zsh
建立一个新的 Prisma 项目
$ prisma init

Generate artifacts (e.g. Prisma Client)
生成工件（例如 Prisma 客户端）
$ prisma generate

浏览您的数据(Browse your data)
$ prisma studio

初始化数据库
Create migrations from your Prisma schema, apply them to the database, generate artifacts (e.g. Prisma Client)
$ prisma migrate dev

[初始化数据](https://www.prisma.io/docs/orm/prisma-migrate/workflows/seeding#integrated-seeding-with-prisma-migrate)
prisma db seed

重置数据库
prisma migrate reset

Pull the schema from an existing database, updating the Prisma schema
$ prisma db pull

Push the Prisma schema state to the database
将 Prisma schema 推送到数据库
$ prisma db push

Validate your Prisma schema
$ prisma validate

Format your Prisma schema
$ prisma format

Display Prisma version info
$ prisma version

Display Prisma debug info
$ prisma debug
```

## docker按照docker

```zsh
docker run --name mysql -p 3306:3306 -e MYSQL_ROOT_PASSWORD=Qwer1234 -d mysql:8
```
