# 📝 Task API

A simple task management RESTful API built with **Node.js**, **Express**, and **DynamoDB Local**, designed to run in a containerized local environment using Docker and the Serverless Framework. The API supports CRUD operations for tasks, including pagination and search filtering, and is documented with Swagger.

---

## 🛠️ Running Locally

### 🔧 Prerequisites

- Node.js (v20+)
- Docker & Docker Compose
- AWS CLI (for local DynamoDB CLI commands)

---

### 🚀 Setup

1. **Install dependencies**

```bash
npm install
```

2. **Start containers (Node.js + DynamoDB Local)**

```bash
make up
```

3. **Create the DynamoDB table**

```bash
make create-table
```

4. **Run development server (live reload + serverless offline)**

```bash
npm run dev:all
```

5. **Open Swagger UI**

```
http://localhost:4000/api-docs/
```

---

## ✅ Makefile Commands (Cheat Sheet)

| Command             | Description                             |
|---------------------|-----------------------------------------|
| `make up`           | Start Docker containers (detached)      |
| `make create-table` | Create the `Tasks` table                |
| `make logs`         | View container logs                    |
| `make ssh-node`     | Access Node.js container shell          |
| `make down`         | Stop and remove containers              |