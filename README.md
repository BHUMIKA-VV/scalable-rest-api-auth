# Scalable REST API with Authentication

## 📖 Overview
This project implements a scalable REST API with JWT-based authentication, role-based access control (RBAC), and a basic frontend UI for testing the APIs.

The backend is built using **Node.js**, **Express**, and **Sequelize** with **PostgreSQL** as the primary database. **SQLite** (in-memory) is used for testing. Authentication utilizes JWT access tokens with refresh token rotation. A minimal **React (Vite)** frontend is included to interact with the backend APIs.


## 📂 Project Structure
```text
├── backend/            # Backend API (Authentication, RBAC, CRUD, Tests)
├── frontend/           # Basic React UI
├── docker-compose.yml  # Docker setup
├── SUBMISSION.md       # Submission notes
└── README.md           # Project documentation
```

## 🛠 Tech Stack

### Backend
- Node.js & Express
- Sequelize (ORM)
- PostgreSQL (Primary DB)
- SQLite (In-memory testing)
- JWT (Authentication)
- Redis (Optional for token revocation/caching)

### Frontend
- React
- Vite
- JavaScript

### Tools & DevOps
- Docker & Docker Compose
- Jest & Supertest (Testing suite)

## ✨ Features

### Backend
- Secure Authentication: User registration, login, and password hashing (Bcrypt).
- Token Management: JWT access and refresh token rotation.
- Access Control: Role-based permissions (User vs. Admin).
- Task Management: Full CRUD APIs for Task resources.
- Clean Architecture: API versioning (/api/v1) and centralized error handling.
- Validation: Robust input validation and automated test coverage.

### Frontend
- User registration and login flows.
- JWT-protected dashboard.
- Task CRUD operations with real-time API response handling.

## 🚀 Setup Instructions

### Backend
Navigate to the folder: cd backend

Create environment file: cp .env.example .env

Install dependencies: npm install

Start development server: npm run dev

Run tests: npm test

### Frontend
Navigate to the folder: cd frontend

Install dependencies: npm install

Start development server: npm run dev

The frontend will attempt to connect to the backend at http://localhost:4000.

### Docker (Quick Start)
To run the entire stack (DB, Backend, and Frontend) in containers:

```bash
docker-compose up --build
```

## ⚙️ Environment Variables
The following variables should be defined in your .env file:

DATABASE_URL: PostgreSQL connection string

JWT_SECRET: Secret key for JWT signing

REDIS_URL: Redis connection string (optional)

PORT: Server port (default: 4000)

## 🛣 API Endpoints

### Authentication
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | /api/v1/auth/register | Register a new user |
| POST | /api/v1/auth/login | Login & receive tokens |
| POST | /api/v1/auth/refresh | Rotate refresh token |
| POST | /api/v1/auth/logout | Invalidate current session |

### Tasks (Protected)
Header: Authorization: Bearer <accessToken>

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | /api/v1/tasks | Get all user tasks |
| POST | /api/v1/tasks | Create a new task |
| GET | /api/v1/tasks/:id | Get specific task |
| PUT | /api/v1/tasks/:id | Update task details |
| DELETE | /api/v1/tasks/:id | Delete a task |

## 📈 Scalability Notes
- Modular Structure: Code is organized by feature for easy scaling into microservices.
- Versioning: API is versioned to allow backward compatibility.
- Caching Ready: Redis support included for high-performance token checks.
- Testing: Uses SQLite for fast, isolated test execution without database side effects.
