#!/bin/bash

# Deploy script for jevoo-service
# This script pulls the latest code, builds the project, and restarts the PM2 service

echo "Starting deployment..."

# Pull latest changes from git
echo "Pulling latest changes from git..."
git pull

# Check if git pull was successful
if [ $? -ne 0 ]; then
    echo "Error: Git pull failed"
    exit 1
fi

# Install dependencies and build
echo "Building project..."
npm run build

# Check if build was successful
if [ $? -ne 0 ]; then
    echo "Error: Build failed"
    exit 1
fi

# Restart PM2 service
echo "Restarting PM2 service..."
pm2 restart jevoo-web-app

# Check if PM2 restart was successful
if [ $? -ne 0 ]; then
    echo "Error: PM2 restart failed"
    exit 1
fi

echo "Deployment completed successfully!"
