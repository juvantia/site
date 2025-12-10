#!/bin/bash
# Upload local database to VPS
# Usage: ./upload_db.sh <vps_ssh_connection_string>
# Example: ./upload_db.sh root@123.456.78.90

if [ -z "$1" ]; then
  echo "Usage: $0 <user@host>"
  echo "Example: $0 root@157.90.170.208"
  exit 1
fi

HOST=$1

echo "Target VPS: $HOST"
echo "----------------------------------------"

# 1. Stop the backend service to release the DB lock
echo "1. Stopping remote backend service..."
ssh $HOST "systemctl stop juvantia-backend"

# 2. Upload the database
echo "2. Uploading 'prisma/dev.db' to '/var/www/juvantia/backend/prisma/dev.db'..."
scp prisma/dev.db $HOST:/var/www/juvantia/backend/prisma/dev.db

# 3. Start the backend service
echo "3. Starting remote backend service..."
ssh $HOST "systemctl start juvantia-backend"

echo "----------------------------------------"
echo "Done! Database restored."
