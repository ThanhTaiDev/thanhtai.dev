# Portfolio Backend API

Backend API for managing comments in the Portfolio website.

## Features

- RESTful API for comments
- PostgreSQL database integration with Prisma ORM
- CORS enabled for frontend integration
- Automatic timestamp formatting
- Support for pinned comments

## Setup

1. Install dependencies:
```bash
npm install
```

2. Create a `.env` file (copy from `.env.example`):
```bash
cp .env.example .env
```

3. Configure PostgreSQL connection in `.env`:
   - For local PostgreSQL: `DATABASE_URL=postgresql://username:password@localhost:5432/portfolio`
   - Example: `DATABASE_URL=postgresql://postgres:postgres@localhost:5432/portfolio`
   - For Koyeb/Cloud PostgreSQL: Use your cloud provider's connection string
     - Example: `DATABASE_URL=postgres://koyeb-adm:password@host:port/database`

4. Make sure PostgreSQL is running:
   - Install PostgreSQL: https://www.postgresql.org/download/
   - Create a database: `CREATE DATABASE portfolio;`
   - Start PostgreSQL service

5. Run Prisma migrations to create database tables:
```bash
npx prisma migrate dev --name init
```

6. (Optional) Seed the database with sample data:
```bash
npx prisma db seed
```

7. Start the server:
```bash
# Development mode (with nodemon)
npm run dev

# Production mode
npm start
```

The server will run on `http://localhost:5000`

## API Endpoints

### GET /api/comments
Get all comments (sorted: pinned first, then newest first)

**Response:**
```json
[
  {
    "id": "507f1f77bcf86cd799439011",
    "name": "John Doe",
    "message": "Great work!",
    "timestamp": "2 hours ago",
    "isPinned": true,
    "profilePhoto": null
  }
]
```

### POST /api/comments
Create a new comment

**Request Body:**
```json
{
  "name": "John Doe",
  "message": "Great work!",
  "profilePhoto": null,
  "isPinned": false
}
```

**Response:**
```json
{
  "id": "507f1f77bcf86cd799439011",
  "name": "John Doe",
  "message": "Great work!",
  "timestamp": "Just now",
  "isPinned": false,
  "profilePhoto": null
}
```

### GET /api/health
Health check endpoint

**Response:**
```json
{
  "status": "OK",
  "message": "Server is running"
}
```

## PostgreSQL Setup

### Option 1: Local PostgreSQL

1. Download and install PostgreSQL from https://www.postgresql.org/download/
2. Start PostgreSQL service
3. Create a database:
   ```sql
   CREATE DATABASE portfolio;
   ```
4. Update `.env` with your connection string:
   ```
   DATABASE_URL=postgresql://username:password@localhost:5432/portfolio
   ```
5. Run migrations:
   ```bash
   npx prisma migrate dev
   ```

### Option 2: PostgreSQL Cloud (Supabase, Railway, etc.)

1. Create a PostgreSQL database on your preferred cloud provider
2. Get the connection string
3. Update `.env` with the connection string
4. Run migrations:
   ```bash
   npx prisma migrate deploy
   ```

## Prisma Commands

- Generate Prisma Client: `npx prisma generate`
- Create migration: `npx prisma migrate dev --name migration_name`
- Open Prisma Studio (database GUI): `npx prisma studio`

