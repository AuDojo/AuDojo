# 1. Verwende ein Basis-Image mit Node.js
FROM node:23-slim AS base
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable
COPY . /app
WORKDIR /app


# 2. Production dependencies
FROM base AS prod-deps
RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm install --prod --frozen-lockfile

# 3. Build stage
FROM base AS build
RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm install --frozen-lockfile
RUN pnpm run build

# 4. Final stage
FROM base

# Copy node_modules
COPY --from=prod-deps /app/node_modules ./node_modules
COPY --from=prod-deps /app/frontend/node_modules ./frontend/node_modules
COPY --from=prod-deps /app/backend/node_modules ./backend/node_modules

# Copy compiled output
COPY --from=build /app/backend/dist ./backend/dist
COPY --from=build /app/frontend/dist ./frontend/dist

# Start server
WORKDIR /app/backend
CMD ["pnpm", "start"]
EXPOSE 5001

