
# User Mapping Service (NestJS + MySQL + Redis)

A high-performance backend service built with **NestJS** to manage unique user mappings between two identifiers (`id1`, `id2`). The system features a **Write-Through Cache** strategy using **Redis** to minimize database load and ensure fast response times.

## Features

* **Unique Mapping**: Generates a persistent `userID` (UUID) for every unique pair of `id1` and `id2`.
* **Caching**: Integrated with **Redis** to cache lookups for 1 hour, significantly reducing MySQL query latency.
* **Validation**: Strict request validation using `class-validator`.
* **Dockerized**: Fully containerized environment with `docker-compose` for easy deployment.

---

## System Architecture

The request flow follows this logic:

1. **Client** sends a POST request with `id1` and `id2`.
2. **App** checks **Redis** cache. If found, returns `userID` immediately.
3. If **Cache Miss**, search **MySQL** database.
4. If not in DB, generate a new **UUID**, save to MySQL, and update Redis.

---

## Tech Stack

* **Framework**: NestJS (Node.js)
* **Database**: MySQL 8.0
* **Cache**: Redis
* **ORM**: TypeORM
* **Infrastructure**: Docker & Docker Compose

---

## Getting Started

### Prerequisites

* Docker and Docker Compose installed.

### Installation & Deployment

1. **Clone the repository**:
```bash
git clone <your-repo-url>
cd backend-test

```


2. **Configure Environment**:
The system uses the `.env` file for configuration. Ensure the following values are set:
```env
DB_HOST=mysql_db
DB_PORT=3306
DB_USERNAME=root
DB_PASSWORD=root_password
DB_NAME=fintech_db
REDIS_HOST=redis_cache
REDIS_PORT=6379

```


3. **Run the Application**:
```bash
docker-compose up --build

```



The API will be available at `http://localhost:3000`.

---

## 📋 API Documentation

### Create/Get User Mapping

**Endpoint**: `POST /user/mapping`

**Request Body**:

```json
{
  "id1": "string_value",
  "id2": "string_value"
}

```

**Success Response (201 Created)**:

```json
{
  "userID": "550e8400-e29b-41d4-a716-446655440000"
}

```

---

## Testing the API

You can test the endpoint using `curl` from your terminal:

```bash
curl -X POST http://localhost:3000/user/mapping \
     -H "Content-Type: application/json" \
     -d '{"id1": "A100", "id2": "B200"}'

```
