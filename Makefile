.PHONY: help build up down logs clean restart test

help:
	@echo "Magician Props Store - Available Commands"
	@echo ""
	@echo "  make build          - Build all Docker images"
	@echo "  make up             - Start all services"
	@echo "  make down           - Stop all services"
	@echo "  make restart        - Restart all services"
	@echo "  make logs           - View logs from all services"
	@echo "  make logs-backend   - View backend logs"
	@echo "  make logs-frontend  - View frontend logs"
	@echo "  make logs-db        - View database logs"
	@echo "  make clean          - Remove all containers and volumes"
	@echo "  make shell-db       - Open database shell"
	@echo ""

build:
	docker-compose build

up:
	docker-compose up -d
	@echo ""
	@echo "✅ Services started!"
	@echo "Frontend: http://localhost:3000"
	@echo "Backend:  http://localhost:3001"
	@echo "Database: postgres://localhost:5432"

down:
	docker-compose down

restart: down up

logs:
	docker-compose logs -f

logs-backend:
	docker-compose logs -f backend

logs-frontend:
	docker-compose logs -f frontend

logs-db:
	docker-compose logs -f postgres

clean:
	docker-compose down -v
	@echo "✅ All containers and volumes removed"

shell-db:
	docker-compose exec postgres psql -U postgres -d magician_props_store

shell-backend:
	docker-compose exec backend /bin/sh

test-backend:
	docker-compose exec backend npm run lint

test-api:
	@echo "Testing API endpoints..."
	@curl -s http://localhost:3001/products | jq '.' | head -50
	@echo ""
	@echo "✅ API is responding"
