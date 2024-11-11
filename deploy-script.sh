#!/bin/bash

# Navigate to the app directory
cd ~/quizzy || { echo "Failed to navigate to ~/quizzy. Exiting."; exit 1; }

# Pull the latest changes from the main branch
echo "Pulling latest changes from main branch..."
if git pull origin main; then
  echo "Successfully pulled latest changes."
else
  echo "Failed to pull latest changes. Exiting."
  exit 1
fi

# Install dependencies
echo "Installing dependencies..."
if npm install; then
  echo "Dependencies installed successfully."
else
  echo "Failed to install dependencies. Exiting."
  exit 1
fi

# Build the application
echo "Building the application..."
if npm run build; then
  echo "Build completed successfully."
else
  echo "Build failed. Exiting."
  exit 1
fi

# Restart the application with PM2
if pm2 restart quizzy; then
  echo "Application restarted successfully with PM2."
else
  echo "Failed to restart application with PM2. Exiting."
  exit 1
fi

echo "Deployment complete!"