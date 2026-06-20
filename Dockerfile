# Build Stage
FROM node:20-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm install --legacy-peer-deps
COPY . .
RUN npm run build

# Production Stage — serve static files with Nginx
FROM nginx:stable-alpine
COPY --from=builder /app/dist /usr/share/nginx/html

# Create the standard sitemap.xml path from the actual page list
RUN mv /usr/share/nginx/html/sitemap-0.xml /usr/share/nginx/html/sitemap.xml || true
# Clean up the redundant index
RUN rm /usr/share/nginx/html/sitemap-index.xml || true
# SPA fallback & AI agent support: copy custom nginx configuration
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
