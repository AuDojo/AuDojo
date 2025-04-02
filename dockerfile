# From https://pnpm.io/docker

# 1. Use base image with minimal node.js
FROM node:23-slim AS base
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable

# 2. Build stage for both frontend and backend
FROM base AS build
COPY . /app
WORKDIR /app

RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm install --frozen-lockfile
RUN pnpm run build
RUN pnpm deploy --filter=frontend --prod /prod/frontend
RUN pnpm deploy --filter=backend --prod /prod/backend

# 4.a) Frontend served by nginx
FROM nginx:1.27.4-alpine-slim AS frontend
# FROM nginx:latest AS frontend

COPY --from=build /prod/frontend/dist /usr/share/nginx/html
COPY --from=build /prod/frontend/nginx/nginx.conf /etc/nginx/nginx.conf

# 4.b) Backend
FROM base AS backend

COPY --from=build /prod/backend /prod/backend
WORKDIR /prod/backend
# Start backend
EXPOSE 5001
CMD ["pnpm", "start"]
