#!/bin/bash
# Setup systemd service on VPS
# Usage: ./setup_service.sh <vps_ssh_connection_string>
# Example: ./setup_service.sh root@general

if [ -z "$1" ]; then
  echo "Usage: $0 <user@host>"
  exit 1
fi

HOST=$1

echo "Target VPS: $HOST"
echo "----------------------------------------"

ssh $HOST << 'EOF'
  set -e
  
  echo "1. Checking if service file exists on VPS..."
  if [ -f "/var/www/juvantia/backend/juvantia-backend.service" ]; then
    echo "   Service file found."
  else
    echo "   ERROR: Service file not found at /var/www/juvantia/backend/juvantia-backend.service"
    echo "   Make sure code is deployed first."
    exit 1
  fi

  echo "2. Installing systemd service..."
  cp /var/www/juvantia/backend/juvantia-backend.service /etc/systemd/system/
  systemctl daemon-reload
  
  echo "3. Enabling and starting service..."
  systemctl enable juvantia-backend
  systemctl restart juvantia-backend
  
  echo "4. Checking service status..."
  systemctl status juvantia-backend --no-pager
EOF
