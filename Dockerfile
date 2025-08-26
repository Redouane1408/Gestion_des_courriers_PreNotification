# Multi-stage build for optimization
FROM node:20-alpine AS dependencies
WORKDIR /app
COPY package*.json ./
# Use npm ci for faster, reliable, reproducible builds
# Add retry and timeout options to handle rate limiting
RUN npm config set fetch-retries 5 && \
    npm config set fetch-retry-mintimeout 20000 && \
    npm config set fetch-retry-maxtimeout 120000 && \
    npm ci --only=production && npm cache clean --force

# Build stage
FROM node:20-alpine AS build
WORKDIR /app
COPY package*.json ./
# Add retry and timeout options to handle rate limiting
RUN npm config set fetch-retries 5 && \
    npm config set fetch-retry-mintimeout 20000 && \
    npm config set fetch-retry-maxtimeout 120000 && \
    npm ci
COPY . .
ENV DOCKER=true
ENV NODE_ENV=production
# Add timestamp to force cache busting
RUN echo "// Force cache busting with timestamp: $(date +%s)" >> src/force-cache-bust.js
# Build with optimizations
RUN npm run build

# Production stage with optimized nginx
FROM nginx:alpine AS final

# Copy built assets
COPY --from=build /app/dist /usr/share/nginx/html

# Copy optimized nginx config
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Remove default nginx config
RUN rm /etc/nginx/conf.d/default.conf.bak 2>/dev/null || true

# Add security headers
RUN echo 'add_header X-Frame-Options "SAMEORIGIN" always;' >> /etc/nginx/conf.d/security.conf && \
    echo 'add_header X-Content-Type-Options "nosniff" always;' >> /etc/nginx/conf.d/security.conf && \
    echo 'add_header X-XSS-Protection "1; mode=block" always;' >> /etc/nginx/conf.d/security.conf && \
    echo 'add_header Cache-Control "no-store, no-cache, must-revalidate, proxy-revalidate, max-age=0" always;' >> /etc/nginx/conf.d/security.conf

# Add custom error page for 404
RUN echo '<html><body><h1>Page not found</h1><p>The requested resource could not be found.</p></body></html>' > /usr/share/nginx/html/404.html

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]