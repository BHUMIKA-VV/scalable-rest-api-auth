# Scalable REST API with Authentication (Assignment)

Overview
-
This repository contains a fullstack assignment implementing a scalable REST API with authentication and role-based access control plus a minimal frontend. The backend uses Node.js, Express, Sequelize (Postgres with an sqlite fallback for tests), JWT access tokens and rotating refresh tokens. The frontend is a small React/Vite stub.

Contents
-
- **backend/** — API server, Sequelize models, auth, tests
- **frontend/** — minimal React app scaffold
- **docker-compose.yml** — Postgres, Redis and backend service
- **SUBMISSION.md** — submission notes

Quick Start (dev)
-
1. Backend

	 - Create an env file from the example:

		 ```powershell
		 cd "F:\Bhumika\sem 7\new1\Ass\backend"
		 copy .env.example .env
		 # edit .env to set DATABASE_URL, JWT_SECRET, REDIS_URL as needed
		 npm install
		 npm run dev
		 ```

	 - Run tests (uses sqlite in-memory):

		 ```powershell
		 npm test
		 ```

2. Frontend (dev)

	 ```powershell
	 cd "F:\Bhumika\sem 7\new1\Ass\frontend"
	 npm install
	 npm run dev
	 ```

Docker (compose)
-
To run the full stack with Postgres and Redis via Docker Compose:

```powershell
cd "F:\Bhumika\sem 7\new1\Ass"
docker-compose up --build
# backend will be available on http://localhost:4000
```

Environment variables (backend)
-
- `DATABASE_URL` — Postgres connection string (example in `backend/.env.example`)
- `JWT_SECRET` — secret used to sign JWT access tokens
- `REDIS_URL` — optional, for token revocation / caching
- `PORT` — backend port (default 4000)

API (summary)
-
- `POST /api/v1/auth/register` — register { email, password, role? }
- `POST /api/v1/auth/login` — login { email, password } → { accessToken, refreshToken }
- `POST /api/v1/auth/refresh` — rotate refresh token { refreshToken } → { accessToken, refreshToken }
- `POST /api/v1/auth/logout` — revoke refresh token { refreshToken }
- `GET /api/v1/tasks` — list tasks (requires `Authorization: Bearer <token>`) — admin sees all
- `POST /api/v1/tasks` — create task (authenticated)
- `GET|PUT|DELETE /api/v1/tasks/:id` — task operations (owner or admin)

Notes
-
- Tests are written with Jest + Supertest and run against an in-memory sqlite DB.
- The current frontend is a minimal stub; you can expand it to call the API endpoints.

Contributing / Next steps
-
- Add Redis-backed refresh-token revocation and caching for lists.
- Harden validation with `express-validator` and improve logging.

License
-
MIT

