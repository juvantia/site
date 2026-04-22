# Build Stage
FROM node:20-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# Production Stage — serve static files with Nginx
FROM nginx:stable-alpine
COPY --from=builder /app/dist /usr/share/nginx/html
# SPA fallback: serve index.html for unknown routes (Astro generates these, but just in case)
RUN printf 'server {\n  listen 80;\n  root /usr/share/nginx/html;\n  index index.html;\n  location / {\n    try_files $uri $uri/ $uri.html /index.html;\n  }\n  location ~* \\.(js|css|png|jpg|jpeg|gif|ico|svg|woff|woff2)$ {\n    expires 1y;\n    add_header Cache-Control "public, max-age=31536000, immutable";\n  }\n}' > /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
