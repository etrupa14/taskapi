.PHONY: up down restart logs ssh-node ssh-db

COMPOSE=docker-compose -f docker-compose.dev.yml

up:
	$(COMPOSE) up -d --build

down:
	$(COMPOSE) down

logs:
	$(COMPOSE) logs -f

ssh-node:
	docker exec -it nodeapp-1 sh

ssh-db:
	docker exec -it dynamodb sh

dev:
	npm run dev:all

create-table:
	@if aws dynamodb describe-table --table-name Tasks --endpoint-url http://localhost:8000 > /dev/null 2>&1; then \
		echo "Table 'Tasks' already exists"; \
	else \
		echo "Creating 'Tasks' table..."; \
		aws dynamodb create-table \
			--table-name Tasks \
			--attribute-definitions AttributeName=id,AttributeType=S \
			--key-schema AttributeName=id,KeyType=HASH \
			--billing-mode PAY_PER_REQUEST \
			--endpoint-url http://localhost:8000; \
	fi

list-tables:
	aws dynamodb list-tables --endpoint-url http://localhost:8000

delete-table:
	aws dynamodb delete-table --table-name Tasks --endpoint-url http://localhost:8000
