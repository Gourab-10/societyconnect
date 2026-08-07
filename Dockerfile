# Production Dockerfile for SocietyConnect
FROM node:22-alpine AS builder

WORKDIR /app

# Copy dependency specifications
COPY package*.json ./

# Install dependencies
RUN npm ci

# Copy full application source
COPY . .

# Build Vite frontend bundle
RUN npm run build

# Production runtime stage
FROM node:22-alpine AS runner

WORKDIR /app

ENV NODE_ENV=production
ENV PORT=3001

COPY package*.json ./
RUN npm ci --only=production

# Copy build artifacts and server source
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/server ./server

EXPOSE 3001

CMD ["npx", "tsx", "server/index.ts"]
