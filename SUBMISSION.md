# Submission Notes

## Project Overview
This submission implements a scalable REST API with JWT-based authentication, role-based access control (RBAC), and a basic React frontend for testing the APIs. The backend is built with Node.js, Express, and Sequelize, using PostgreSQL for production and SQLite for testing. Authentication is handled via JWT tokens with refresh token rotation.

## Implemented Features
- **Backend**:
  - User registration and login with password hashing (bcrypt).
  - JWT access and refresh token management.
  - Role-based access control (User and Admin roles).
  - Full CRUD operations for Task resources.
  - API versioning (/api/v1) and centralized error handling.
  - Input validation and automated test coverage using Jest and Supertest.
- **Frontend**:
  - User registration and login forms.
  - JWT-protected dashboard.
  - Task CRUD operations with real-time API interactions.
- **Infrastructure**:
  - Docker Compose setup for full-stack deployment.
  - Environment variable configuration.
  - Modular code structure for scalability.

## Setup Instructions
1. **Backend**:
   - Navigate to `backend/` directory.
   - Copy `.env.example` to `.env` and configure variables (DATABASE_URL, JWT_SECRET, etc.).
   - Run `npm install` to install dependencies.
   - Run `npm run dev` to start the development server.
   - Run `npm test` to execute tests (uses in-memory SQLite).

2. **Frontend**:
   - Navigate to `frontend/` directory.
   - Run `npm install` to install dependencies.
   - Run `npm run dev` to start the development server (connects to backend at http://localhost:4000).

3. **Docker**:
   - Run `docker-compose up --build` to start the full stack with PostgreSQL and Redis.

## API Endpoints
- **Authentication**:
  - `POST /api/v1/auth/register`: Register a new user.
  - `POST /api/v1/auth/login`: Login and receive tokens.
  - `POST /api/v1/auth/refresh`: Rotate refresh token.
  - `POST /api/v1/auth/logout`: Invalidate session.
- **Tasks** (Protected):
  - `GET /api/v1/tasks`: Get all user tasks (Admin sees all).
  - `POST /api/v1/tasks`: Create a new task.
  - `GET /api/v1/tasks/:id`: Get specific task.
  - `PUT /api/v1/tasks/:id`: Update task.
  - `DELETE /api/v1/tasks/:id`: Delete task.

## Challenges Faced
- Implementing refresh token rotation securely.
- Ensuring proper RBAC for task operations.
- Integrating Sequelize with PostgreSQL and SQLite for different environments.
- Setting up Docker Compose for multi-service architecture.

## Additional Notes
- Tests are comprehensive, covering authentication, task CRUD, and error scenarios.
- The frontend is a minimal implementation; it can be expanded for more features.
- Redis is optional for token caching; the app works without it.
- Code is organized modularly for easy scaling into microservices.

## Environment Variables
- `DATABASE_URL`: PostgreSQL connection string.
- `JWT_SECRET`: Secret for JWT signing.
- `REDIS_URL`: Optional Redis URL.
- `PORT`: Backend port (default 4000).


