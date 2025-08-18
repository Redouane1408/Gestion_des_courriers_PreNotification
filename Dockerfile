# Multi-stage build for optimization
FROM node:20-alpine AS dependencies
WORKDIR /app
COPY package*.json ./
# Use npm ci for faster, reliable, reproducible builds
RUN npm ci --only=production && npm cache clean --force

# Build stage
FROM node:20-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
ENV DOCKER=true
ENV NODE_ENV=production
# Build with optimizations
RUN npm run build

# Production stage with optimized nginx
FROM nginx:alpine AS final

# Install brotli module for better compression
RUN apk add --no-cache nginx-mod-http-brotli

# Copy built assets
COPY --from=build /app/dist /usr/share/nginx/html

# Copy optimized nginx config
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Remove default nginx config
RUN rm /etc/nginx/conf.d/default.conf.bak 2>/dev/null || true

# Add security headers
RUN echo 'add_header X-Frame-Options "SAMEORIGIN" always;' >> /etc/nginx/conf.d/security.conf && \
    echo 'add_header X-Content-Type-Options "nosniff" always;' >> /etc/nginx/conf.d/security.conf && \
    echo 'add_header X-XSS-Protection "1; mode=block" always;' >> /etc/nginx/conf.d/security.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]

