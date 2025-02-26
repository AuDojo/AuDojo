# From https://pnpm.io/docker

# 1. Use base image with minimal node.js
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

# Copy production node_modules
COPY --from=prod-deps /app/node_modules /app/node_modules
COPY --from=prod-deps /app/frontend/node_modules /app/frontend/node_modules
COPY --from=prod-deps /app/backend/node_modules /app/backend/node_modules
# Copy built files
COPY --from=build /app/backend/dist /app/backend/dist
COPY --from=build /app/frontend/dist /app/frontend/dist

# Start server
WORKDIR /app/backend
CMD ["pnpm", "start"]
EXPOSE 5001
