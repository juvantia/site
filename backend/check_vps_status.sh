#!/bin/bash
# Check detailed status of VPS deployment
# Usage: ./check_vps_status.sh <vps_ssh_connection_string>

if [ -z "$1" ]; then
  echo "Usage: $0 <user@host>"
  exit 1
fi

HOST=$1

echo "Checking VPS: $HOST"
echo "========================================"

ssh $HOST << 'EOF'
  echo "--- 1. Service Status ---"
  systemctl status juvantia-backend --no-pager || echo "Service not found or error"
  
  echo -e "\n--- 2. Last 50 Log Lines ---"
  journalctl -u juvantia-backend -n 50 --no-pager
  
  echo -e "\n--- 3. Database File ---"
  ls -l /var/www/juvantia/backend/prisma/dev.db || echo "Database file missing"
  
  echo -e "\n--- 4. Local Connectivity Test (from VPS to itself) ---"
  curl -v http://localhost:3001/api/districts 2>&1 | head -n 10 || echo "Curl failed"
  
  echo -e "\n--- 5. Nginx Configuration for /api ---"
  grep -A 10 "location /api" /etc/nginx/sites-enabled/* || echo "No /api location found in enabled sites"
EOF
