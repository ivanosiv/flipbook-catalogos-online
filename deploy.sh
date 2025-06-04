
#!/bin/bash

# Deploy script for VPS
echo "Starting deployment..."

# Pull latest changes
git pull origin main

# Build Docker image
docker-compose down
docker-compose build --no-cache

# Start services
docker-compose up -d

# Clean up old images
docker image prune -f

echo "Deployment completed!"
echo "Site available at: http://your-vps-ip"
echo "To enable HTTPS, configure SSL certificates in nginx.conf"
