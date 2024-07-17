#构建阶段
FROM node:21-slim as builder

ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable
WORKDIR /app
COPY . /app

RUN npm config set registry https://registry.npmmirror.com
RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm install --frozen-lockfile
RUN pnpm run build

#运行阶段
FROM nginx:1.25.4
COPY --from=builder /config/nginx /etc/nginx/conf.d
COPY --from=builder /app/dist /usr/share/nginx/html
