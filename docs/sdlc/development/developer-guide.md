# Developer Guide

> Maintained by QuorQ AI SDLC. Text between `sdlc:auto` markers is regenerated; anything outside them is yours and is kept.

<!-- sdlc:auto:start status -->
_Up to date._
<!-- sdlc:auto:end status -->

<!-- sdlc:auto:start source -->
Generated from commit `a466845` · model `claude-sonnet-5`
<!-- sdlc:auto:end source -->

<!-- sdlc:auto:start overview -->
This is a generated full-stack chat application scaffold with two independently runnable pieces: a React 19 + TypeScript SPA (Vite) that implements the approved, reviewed UI (Login, Signup, Chat Dashboard) running entirely on seeded sample data, and a FastAPI backend that currently exposes only a `/health` liveness endpoint plus the plumbing (SQLAlchemy models/session, CORS, typed stub-response schema) to add real routes later. The backend defaults to a local SQLite file so it runs without any database server, while `docker-compose.yml` can stand up a Postgres 16 instance for the approved production architecture when `DATABASE_URL` is pointed at it.
<!-- sdlc:auto:end overview -->

<!-- sdlc:auto:start prerequisites -->
- Node.js (for npm/Vite, React 19, TypeScript 5.6)
- Python 3.12
- pip
- Docker and Docker Compose (optional, only needed to run the Postgres service in docker-compose.yml)
<!-- sdlc:auto:end prerequisites -->

<!-- sdlc:auto:start setup -->
1. Clone the repository
2. cd frontend && npm install
3. cd backend && pip install -r requirements.txt
4. (optional) copy .env.example to .env and set values such as VITE_API_BASE_URL / DATABASE_URL / ALLOWED_ORIGINS as needed
5. (optional) docker-compose up -d  # starts Postgres 16 on localhost:5432 if you want to use it instead of the default SQLite file
<!-- sdlc:auto:end setup -->

<!-- sdlc:auto:start run -->
| Name | Command | Description |
|---|---|---|
| frontend dev | `npm run dev` | Starts the Vite dev server for the React SPA (run from frontend/) |
| frontend build | `npm run build` | Bundles the app with Vite; does not typecheck |
| frontend preview | `npm run preview` | Serves the built frontend bundle locally |
| backend dev | `uvicorn app.main:app --reload` | Runs the FastAPI backend with auto-reload (run from backend/); serves /health and creates DB tables on startup |
<!-- sdlc:auto:end run -->

<!-- sdlc:auto:start structure -->
| Path | Purpose |
|---|---|
| `frontend` | React + TypeScript SPA (Vite); the approved, reviewed UI |
| `frontend/src` | App source: screens, shared lib (api client, ui/icon vocabulary, brand tokens), entrypoint |
| `frontend/e2e` | Playwright end-to-end acceptance tests |
| `backend` | FastAPI service scaffold |
| `backend/app` | Application code: main entrypoint, database engine/session, SQLAlchemy models, Pydantic schemas, routers package |
| `backend/tests` | Pytest tests (currently health-check test) |
| `.quorq` | Platform handoff metadata (not application code) |
| `docker-compose.yml` | Defines the Postgres 16 service used for local/approved-architecture persistence |
| `.env.example` | Template for environment variables consumed by frontend/backend |
<!-- sdlc:auto:end structure -->

<!-- sdlc:auto:start conventions -->
- Backend: one router per architecture component that owns endpoints, one route per spec'd endpoint; unimplemented routes return a typed StubResponse rather than erroring
- Backend models live in app/models.py built on a shared SQLAlchemy Base from app/database.py; tables are created via Base.metadata.create_all on startup (no migrations yet)
- Backend config via environment variables with safe local defaults: DATABASE_URL defaults to sqlite:///./app.db, ALLOWED_ORIGINS defaults to the Vite dev server origins
- Frontend screens live one-per-file under src/screens/; shared UI primitives and icons live in src/lib/ui.tsx and src/lib/icons.tsx; brand tokens in src/lib/brand.ts and index.css
- Frontend component tests live beside the components they test and use Vitest + Testing Library + jsdom
- Frontend API calls are centralized in src/lib/api.ts (apiFetch helper), though screens currently render seeded sample data rather than calling it
- Linting/formatting enforced via ESLint + Prettier (frontend) and ruff (backend)
<!-- sdlc:auto:end conventions -->

<!-- sdlc:auto:start testing -->
| Name | Command | Description |
|---|---|---|
| frontend unit tests | `npm test` | Runs Vitest component tests under src/ |
| frontend typecheck | `npm run typecheck` | Runs tsc --noEmit (not run by build) |
| frontend lint | `npm run lint` | Runs ESLint over the frontend app |
| frontend e2e | `npm run test:e2e` | Runs Playwright acceptance tests from e2e/; builds/serves the app and boots the backend locally unless E2E_BASE_URL is set |
| frontend e2e browser install | `npm run test:e2e:install` | Installs the Chromium browser Playwright needs |
| backend tests | `pytest` | Runs backend tests (currently the health-check test) from backend/ |
| backend lint | `ruff check .` | Lints the backend Python code |
<!-- sdlc:auto:end testing -->

<!-- sdlc:auto:start troubleshooting -->
| Problem | Solution |
|---|---|
| Frontend requests to the backend are blocked by CORS | Set ALLOWED_ORIGINS on the backend to a comma-separated list including the frontend's origin, or run the frontend on the default Vite dev ports (http://localhost:5173 / http://127.0.0.1:5173), which are allowed by default |
| `npm run build` succeeds but the app has type errors | Run `npm run typecheck` (tsc --noEmit) separately, since `vite build` does not typecheck |
| `pytest` fails with `ModuleNotFoundError: app` | Run pytest from the backend/ directory; pytest.ini sets pythonpath = . so `import app` resolves from there |
| Backend has no persisted data across restarts in a container deployment | Set DATABASE_URL to point at the Postgres instance from docker-compose.yml instead of relying on the default local SQLite file |
| Playwright e2e tests hang waiting for servers | Run `npm run test:e2e:install` first to fetch Chromium, and ensure port 8000 (backend) and 4173 (preview) are free, or set E2E_BASE_URL to test against an already-deployed instance |
<!-- sdlc:auto:end troubleshooting -->
