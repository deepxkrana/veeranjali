# Veeranjali

**Stories of courage. Lives of service. A nation remembers.**

Veeranjali is a respectful, modern digital memorial and knowledge archive dedicated to Indian Army soldiers, Indian Navy and Air Force personnel, CAPF members, police personnel, and other public servants who lost their lives while serving the nation.

## Overview

This platform serves as a dignified, factual, and accessible archive that feels like a modern encyclopedia combined with a digital memorial. It allows visitors to discover tribute stories, search and browse profiles, and contributors to submit new stories for review.

## Architecture

```
veeranjali/
├── frontend/     # React + Vite + TypeScript
├── backend/      # Node.js + Express + TypeScript
├── database/     # Prisma + PostgreSQL
├── e2e/          # Playwright tests
└── docs/         # Documentation
```

## Technology Stack

### Frontend
- React 18 + Vite
- TypeScript (strict mode)
- Tailwind CSS + shadcn/ui
- Framer Motion
- React Hook Form + Zod
- TanStack Query
- Axios

### Backend
- Node.js + Express
- TypeScript (strict mode)
- Prisma ORM
- Better Auth
- Zod validation

### Database
- PostgreSQL (Neon)
- Prisma migrations

### Testing
- Vitest (unit/integration)
- Playwright (E2E)

## Quick Start

### Prerequisites
- Node.js 18+
- PostgreSQL (or Neon account)
- npm

### 1. Clone and Install

```bash
git clone <repository-url>
cd veeranjali

# Install all dependencies
npm install
cd frontend && npm install && cd ..
cd backend && npm install && cd ..
cd database && npm install && cd ..
```

### 2. Environment Setup

#### Database (.env in database/)
```bash
DATABASE_URL="postgresql://user:password@host:5432/veeranjali?sslmode=require"
DIRECT_DATABASE_URL="postgresql://user:password@host:5432/veeranjali?sslmode=require"
```

#### Backend (.env in backend/)
```bash
DATABASE_URL="postgresql://user:password@host:5432/veeranjali?sslmode=require"
SESSION_SECRET="your-secure-session-secret-min-32-chars"
FRONTEND_URL="http://localhost:5173"
CORS_ORIGIN="http://localhost:5173"
```

#### Frontend (.env in frontend/)
```bash
VITE_API_URL="http://localhost:3000/api/v1"
VITE_APP_NAME="Veeranjali"
```

### 3. Database Setup

```bash
# Generate Prisma client
npm run db:generate

# Run migrations
npm run db:migrate

# Seed database (creates fictional test data)
npm run db:seed
```

### 4. Development

```bash
# Terminal 1: Backend
npm run dev:backend

# Terminal 2: Frontend
npm run dev:frontend

# Terminal 3: Database studio (optional)
npm run db:studio
```

- Frontend: http://localhost:5173
- Backend: http://localhost:3000
- Prisma Studio: http://localhost:5555

## Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev:frontend` | Start frontend dev server |
| `npm run dev:backend` | Start backend dev server |
| `npm run build:frontend` | Build frontend for production |
| `npm run build:backend` | Build backend for production |
| `npm run lint` | Run ESLint on all code |
| `npm run typecheck` | Run TypeScript type checking |
| `npm run test` | Run backend tests |
| `npm run test:e2e` | Run Playwright E2E tests |
| `npm run db:generate` | Generate Prisma client |
| `npm run db:validate` | Validate the Prisma schema |
| `npm run db:migrate` | Run database migrations |
| `npm run db:seed` | Seed database with test data |
| `npm run db:studio` | Open Prisma Studio |
| `npm run db:reset` | Reset and reseed database |

## User Roles

| Role | Capabilities |
|------|-------------|
| **USER** | View published profiles, search, bookmark, report errors, apply to become contributor |
| **CONTRIBUTOR** | Create drafts, submit stories for review, respond to feedback |
| **ADMIN** | Review and publish stories, manage users, review corrections, manage site settings |

## Story Workflow

```
DRAFT → SUBMITTED_FOR_REVIEW → NEEDS_CHANGES → RESUBMITTED → APPROVED → PUBLISHED → ARCHIVED
```

Only ADMIN can publish stories. Draft and unpublished stories are never visible to the public.

## Project Structure

### Frontend (`frontend/`)
```
src/
├── components/     # Reusable UI components
├── features/       # Feature-based modules
├── hooks/          # Custom React hooks
├── layouts/        # Page layouts
├── lib/            # Utilities, API client, auth
├── pages/          # Route pages
├── routes/         # React Router setup
├── styles/         # Global styles
└── types/          # TypeScript types
```

### Backend (`backend/`)
```
src/
├── config/         # Configuration
├── middleware/     # Express middleware
├── routes/         # API routes
├── controllers/    # Request handlers
├── services/       # Business logic
├── repositories/   # Database operations
├── validators/     # Zod schemas
├── lib/            # Utilities
└── utils/          # Helper functions
```

### Database (`database/`)
```
prisma/
├── schema.prisma   # Database schema
├── seed.ts         # Seed data
└── migrations/     # Migration files
```

## Documentation

- [API Documentation](docs/API.md)
- [Deployment Guide](docs/DEPLOYMENT.md)
- [Editorial Guidelines](docs/EDITORIAL_GUIDELINES.md)
- [Contributor Guidelines](docs/CONTRIBUTOR_GUIDELINES.md)

## Content Safety

This platform deals with real people and potentially grieving families. Key principles:

- No private addresses, phone numbers, or sensitive personal data
- No graphic photographs or descriptions
- All claims must be sourced
- Family members can request corrections
- Attribution required for all media
- Incomplete information clearly labeled

## Security

- HTTP-only secure cookies for sessions
- Server-side authorization on every protected route
- Zod validation on all inputs
- Rate limiting on sensitive endpoints
- Audit logging for privileged actions
- No secrets in source control

## Testing

### Seed Data Credentials (Development Only)

| Role | Email | Password |
|------|-------|----------|
| Admin | admin@example.com | admin123 |
| Contributor | contributor@example.com | contributor123 |
| User | user@example.com | user123 |

⚠️ **Never use these credentials in production**

## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md) for guidelines.

## License

MIT
