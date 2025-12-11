#!/bin/bash
# Build and Deploy Frontend to VPS
# Usage: ./deploy_frontend.sh <vps_ssh_connection_string>
# Example: ./deploy_frontend.sh root@juvantia.org

if [ -z "$1" ]; then
  echo "Usage: $0 <user@host>"
  exit 1
fi

HOST=$1

echo "Target VPS: $HOST"
echo "----------------------------------------"

# 1. Build the frontend locally
echo "1. Building frontend..."
cd .. # Go to site root
npm install # Ensure deps are installed
npm run build
if [ $? -ne 0 ]; then
    echo "Build failed!"
    exit 1
fi

# 2. Deploy to VPS
echo "2. Uploading 'dist/' to '/var/www/juvantia/site/'..."
# Using rsync to match the GitHub Actions workflow
rsync -avz --delete dist/ $HOST:/var/www/juvantia/site/

echo "----------------------------------------"
echo "Frontend deployed!"
echo "If the image still doesn't appear, check if Nginx root path matches the deploy path."
