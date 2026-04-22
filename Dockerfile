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
# SPA fallback: serve index.html for unknown routes (Astro generates these, but just in case)
RUN printf 'server {\n  listen 80;\n  root /usr/share/nginx/html;\n  index index.html;\n  error_page 404 /404.html;\n  location / {\n    try_files $uri $uri/ $uri.html =404;\n  }\n  location ~* \\.(js|css|png|jpg|jpeg|gif|ico|svg|woff|woff2)$ {\n    expires 1y;\n    add_header Cache-Control "public, max-age=31536000, immutable";\n  }\n}' > /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
