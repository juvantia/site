# Juvantia Backend Setup on VPS

## Prerequisites
- Node.js 20+ installed
- npm installed
- Backend files deployed to `/var/www/juvantia/backend`
- `.env` file created in backend directory

## Step 1: Install Dependencies and Setup Database

```bash
cd /var/www/juvantia/backend

# Install dependencies
npm install

# Generate Prisma client
npx prisma generate

# Initialize database (creates dev.db if it doesn't exist)
npx prisma db push

# Optional: Seed database with initial data
npm run seed
```

## Step 2: Setup Systemd Service

```bash
# Copy service file to systemd directory
sudo cp /var/www/juvantia/backend/juvantia-backend.service /etc/systemd/system/

# Reload systemd to recognize new service
sudo systemctl daemon-reload

# Enable service to start on boot
sudo systemctl enable juvantia-backend

# Start the service
sudo systemctl start juvantia-backend

# Check service status
sudo systemctl status juvantia-backend
```

## Step 3: Configure Nginx (if using reverse proxy)

Add this location block to your Nginx site configuration:

```nginx
# Backend API proxy
location /api/ {
    client_max_body_size 50M; # Allow larger uploads
    proxy_pass http://localhost:3001;
    proxy_http_version 1.1;
    proxy_set_header Upgrade $http_upgrade;
    proxy_set_header Connection 'upgrade';
    proxy_set_header Host $host;
    proxy_cache_bypass $http_upgrade;
    proxy_set_header X-Real-IP $remote_addr;
    proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    proxy_set_header X-Forwarded-Proto $scheme;
}
```

Then reload Nginx:

```bash
sudo nginx -t
sudo systemctl reload nginx
```

## Useful Commands

```bash
# View logs
sudo journalctl -u juvantia-backend -f

# Restart service
sudo systemctl restart juvantia-backend

# Stop service
sudo systemctl stop juvantia-backend

# Check if backend is running
curl http://localhost:3001/api/districts
```

## Troubleshooting

### Service won't start
```bash
# Check logs
sudo journalctl -u juvantia-backend -n 50

# Check if port 3001 is already in use
sudo lsof -i :3001
```

### Database issues
```bash
cd /var/www/juvantia/backend
npx prisma studio  # Opens database GUI on port 5555
```

### Permission issues
```bash
# Ensure correct ownership
sudo chown -R root:root /var/www/juvantia/backend
```
