# Finance Data Processing and Access Control Dashboard API

A complete backend system for managing financial records with role-based access control (RBAC).

## Table of Contents

- [Tech Stack](#tech-stack)
- [Features](#features)
- [Project Structure](#project-structure)
- [Setup Instructions](#setup-instructions)
- [API Endpoints](#api-endpoints)
- [Role Behavior](#role-behavior)
- [Assumptions](#assumptions)

## Tech Stack

- **Runtime**: Node.js
- **Framework**: Express.js
- **Language**: TypeScript
- **ORM**: Prisma
- **Database**: SQLite (easily switchable to PostgreSQL)
- **Authentication**: JWT (JSON Web Tokens)
- **Validation**: Zod

## Features

-  User Management with RBAC
  - Create users with roles (Viewer, Analyst, Admin)
  - Activate/deactivate users
  - Full CRUD operations
-  Financial Records Management
  - Create, read, update, delete records
  - Filter by date range, category, type
  - Pagination support
-  Dashboard Analytics
  - Total income/expenses
  - Net balance
  - Category-wise totals
  - Recent transactions
  - Monthly summary
-   Role-Based Access Control
  - Middleware for authentication
  - Role-based authorization
-   Input Validation
  - Request validation with Zod
  - Proper error handling

## Project Structure

```
src/
├── config/          # Configuration
├── controllers/    # Request handlers
├── database/       # Prisma client
├── middleware/     # Express middleware
│   ├── auth.ts     # JWT authentication
│   └── rbac.ts    # Role-based access control
├── routes/         # API routes
├── services/       # Business logic
├── types/          # TypeScript types
├── utils/          # Utility functions
│   ├── response.ts # API response helpers
│   └── validation.ts # Zod schemas
└── index.ts        # Application entry point
```

## Setup Instructions

### Prerequisites

- Node.js (v18 or higher)
- npm

### Installation

1. Clone the repository:
```bash
git clone < repository-url >
cd < project-folder >
```

2. Install dependencies:
```bash
npm install
```

3. Generate Prisma client and run migrations:
```bash
npm run prisma:generate
npm run prisma:migrate
```

4. Seed the database with sample data:
```bash
npm run prisma:seed
```

Or use the combined command:
```bash
npm run db:setup
```

5. Start the development server:
```bash
npm run dev
```

The server will start at http://localhost:3000

### Test Accounts

After seeding, you can use these accounts:

| Role    | Email               | Password     |
|--------|--------------------|--------------|
| Admin  | admin@example.com  | password123 |
| Analyst| analyst@example.com| password123 |
| Viewer | viewer@example.com| password123 |

## API Endpoints

### Authentication

| Method | Endpoint          | Description        | Auth Required |
|--------|------------------|-------------------|---------------|
| POST   | /api/auth/register | Register a new user | No |
| POST   | /api/auth/login    | Login user         | No |
| GET    | /api/auth/profile  | Get user profile   | Yes |

### User Management (Admin Only)

| Method | Endpoint          | Description        | Auth Required |
|--------|------------------|-------------------|---------------|
| GET    | /api/users         | List all users   | Yes (Admin)  |
| GET    | /api/users/:id    | Get user by ID   | Yes (Admin)  |
| PUT    | /api/users/:id     | Update user      | Yes (Admin)  |
| POST   | /api/users/:id/deactivate | Deactivate user | Yes (Admin) |
| POST   | /api/users/:id/activate | Activate user  | Yes (Admin) |
| DELETE | /api/users/:id    | Delete user    | Yes (Admin)  |

### Financial Records

| Method | Endpoint          | Description        | Auth Required | Roles |
|--------|------------------|-------------------|----------------|-------|
| GET    | /api/records     | List records (with filters) | Yes | Analyst, Admin |
| GET    | /api/records/:id | Get record by ID | Yes | Analyst, Admin |
| POST   | /api/records    | Create record   | Yes | Admin |
| PUT    | /api/records/:id | Update record  | Yes | Admin |
| DELETE | /api/records/:id | Delete record | Yes | Admin |

### Dashboard Summary

| Method | Endpoint                | Description         | Auth Required | Roles |
|--------|-----------------------|--------------------|--------------|-------|
| GET    | /api/records/summary   | Financial summary  | Yes | All |
| GET    | /api/records/category-totals | Category totals | Yes | All |
| GET    | /api/records/recent   | Recent transactions | Yes | All |
| GET    | /api/records/monthly  | Monthly summary   | Yes | All |

## API Request/Response Format

### Success Response
```json
{
  "success": true,
  "message": "Success",
  "data": { ... }
}
```

### Error Response
```json
{
  "success": false,
  "error": "Error message"
}
```

### Record Object
```json
{
  "id": 1,
  "amount": 5000,
  "type": "INCOME",
  "category": "Salary",
  "date": "2024-01-01T00:00:00.000Z",
  "notes": "Monthly salary",
  "createdBy": 1,
  "createdAt": "2024-01-01T00:00:00.000Z",
  "updatedAt": "2024-01-01T00:00:00.000Z"
}
```

### Pagination Response
```json
{
  "records": [...],
  "pagination": {
    "page": 1,
    "limit": 10,
    "total": 100,
    "totalPages": 10
  }
}
```

## Role Behavior

| Feature                  | Viewer | Analyst | Admin |
|-------------------------|--------|--------|-------|
| View summaries           | Y     | Y     | Y    |
| View records list       | N     | Y     | Y    |
| View single record     | N     | Y     | Y    |
| Create records         | N     | N     | Y    |
| Update records         | N     | N     | Y    |
| Delete records         | N     | N     | Y    |
| View users list         | N     | N     | Y    |
| Create users            | N     | N     | Y    |
| Update users           | N     | N     | Y   |
| Delete users           | N     | N     | Y    |
| Activate/deactivate users | N | N    | Y   |

### Role Permissions Explained

- **Viewer**: Can only access summary endpoints (total income/expenses, category totals, recent transactions)
- **Analyst**: Can view all financial records but cannot create, update, or delete
- **Admin**: Full access to all endpoints including user management

## Query Parameters

### Record Filters

| Parameter   | Type    | Description                    |
|-------------|--------|--------------------------------|
| page        | number | Page number (default: 1)       |
| limit       | number | Items per page (default: 10)   |
| startDate   | string | Filter records from date      |
| endDate     | string | Filter records to date        |
| category    | string | Filter by category            |
| type        | string | Filter by type (INCOME/EXPENSE) |
| search      | string | Search in notes/category      |

## Assumptions

1. **Database**: SQLite is used for simplicity. The database can easily be switched to PostgreSQL by changing the `DATABASE_URL` in the `.env` file.

2. **Authentication**: JWT tokens are used with a 24-hour expiration. In production, this should be reduced and tokens should be stored securely.

3. **Soft Delete**: Financial records use soft delete (isDeleted flag) rather than permanent deletion.

4. **Password**: Minimum 6 characters required for passwords.

5. **Date Format**: All dates are in ISO 8601 format (e.g., "2024-01-01T00:00:00.000Z").

6. **Pagination**: Default page size is 10, maximum is 100.

7. **Categories**: Categories are stored as strings and can be any value (e.g., "Salary", "Rent", "Utilities").

## Development

### Running Tests

```bash
npm test
```

### Building for Production

```bash
npm run build
npm start
```

//CHANGE IN ENV KEY REQ