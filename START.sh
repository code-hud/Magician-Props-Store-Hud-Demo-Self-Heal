#!/bin/bash

# Magician Props Store - Startup Script
# This script starts the entire application with one command

echo ""
echo "🎩 Magician Props Store"
echo "========================"
echo ""
echo "Starting all services..."
echo ""

# Check if Docker is running
if ! command -v docker &> /dev/null; then
    echo "❌ Error: Docker is not installed or not in PATH"
    exit 1
fi

# Start services
docker-compose up --build

echo ""
echo "✅ Services started!"
echo ""
echo "Frontend: http://localhost:3000"
echo "Backend:  http://localhost:3001"
echo "Database: postgres://postgres:postgres@localhost:5432/magician_props_store"
echo ""
echo "Press Ctrl+C to stop the services"
echo ""
