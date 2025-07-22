# Builder
FROM node:20-alpine AS build

WORKDIR /app
COPY package*.json ./
RUN npm install

# Copy source and build
COPY . .
ENV DOCKER=true
RUN npm run build

# Production image
FROM nginx:alpine AS final

COPY --from=build /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]

