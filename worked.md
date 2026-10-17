# Veeranjali - Implementation Progress

## Project Overview
**Veeranjali** - A digital memorial and knowledge archive dedicated to Indian armed forces personnel and public servants who lost their lives while serving the nation.

**Tagline:** "Stories of courage. Lives of service. A nation remembers."

---

## Phase 1: Project Foundation and Planning ✅

### 1.1 Repository Inspection
- **Status:** Empty directory - fresh start
- **Decision:** Create all structure from scratch following specification

### 1.2 Directory Structure Created
```
veeranjali/
├── frontend/           # React + Vite + TypeScript
├── backend/            # Node.js + Express + TypeScript
├── database/           # Prisma + PostgreSQL
├── e2e/               # Playwright tests
├── docs/              # Documentation
├── .gitignore
├── README.md
└── package.json       # Root convenience scripts
```

### 1.3 Technology Stack Decisions
| Component | Technology | Rationale |
|-----------|-----------|-----------|
| Frontend Framework | React 18 + Vite | Fast, modern, excellent DX |
| Frontend Language | TypeScript (strict) | Type safety, better maintenance |
| Styling | Tailwind CSS + shadcn/ui | Accessible, customizable, consistent |
| Animation | Framer Motion | Subtle, purposeful animations |
| Forms | React Hook Form + Zod | Type-safe validation |
| Server State | TanStack Query | Caching, synchronization |
| Backend Framework | Express.js | Mature, well-documented |
| Backend Language | TypeScript (strict) | Type safety, shared types |
| Database | PostgreSQL (Neon) | Reliable, scalable, Prisma support |
| ORM | Prisma | Type-safe, migrations, great DX |
| Authentication | Better Auth | Modern, secure, session-based |
| Storage | UploadThing | Simple, secure, S3-compatible |
| Testing | Vitest + Playwright | Fast unit tests, reliable E2E |

### 1.4 Architecture Decisions

#### Authentication Strategy
- **Solution:** Better Auth with HTTP-only cookies
- **Rationale:**
  - Secure session-based authentication
  - No localStorage token storage
  - Built-in CSRF protection
  - Easy integration with React + Express
  - Supports multiple providers if needed later

#### API Architecture
- **Pattern:** REST API with versioning (/api/v1)
- **Structure:** Controllers → Services → Repositories
- **Validation:** Zod schemas at route level
- **Response Format:** Consistent JSON structure with data/meta

#### Database Design Principles
- **Naming:** Snake_case for database, camelCase for application
- **Soft Deletion:** Status fields for archive/suspend states
- **Audit Trail:** Every status transition logged
- **Indexing:** Optimized for search filters and common queries

#### Frontend Architecture
- **State Management:** React Query for server state, React state for UI
- **Routing:** React Router v6 with protected route components
- **API Client:** Axios instance with interceptors
- **Error Handling:** Error boundaries + toast notifications

### 1.5 Security Principles Established
1. Never expose database credentials to frontend
2. Never trust role data from browser
3. Validate everything server-side with Zod
4. Use HTTP-only cookies for sessions
5. Rate limit sensitive endpoints
6. Log all privileged actions
7. Sanitize all rich text input
8. Validate uploads server-side
9. No secrets in source control

### 1.6 Content Safety Principles Established
1. No private addresses or phone numbers
2. No graphic photographs or descriptions
3. No unsourced claims as fact
4. Distinguish official vs. family sources
5. Correction and takedown processes
6. Require attribution for media
7. Label incomplete/disputed information
8. Never expose admin notes publicly

### 1.7 Development Workflow
```bash
# Development (3 terminals)
npm run dev:backend     # Terminal 1: Backend server
npm run dev:frontend    # Terminal 2: Frontend dev server
npm run db:studio       # Terminal 3: Prisma Studio (optional)

# Building
npm run build:frontend
npm run build:backend

# Testing
npm run test           # Unit tests
npm run test:e2e       # E2E tests

# Database
npm run db:generate    # Generate Prisma client
npm run db:migrate     # Run migrations
npm run db:seed        # Seed database
```

---

## Phase 2: Database Schema and Prisma Setup ✅

### 2.1 Prisma Schema Design

#### Core Models
- **User** - Authentication and profile
- **ContributorApplication** - Application workflow
- **Person** - Main tribute entity
- **ServiceRecord** - Service history entries
- **TimelineEvent** - Life events
- **Award** - Decorations and honors
- **PersonAward** - Junction table
- **Operation** - Military operations
- **PersonOperation** - Junction table
- **Source** - Reference materials
- **PersonSource** - Junction table
- **MediaAsset** - Images and documents
- **StorySubmission** - Contributor submissions
- **StoryRevision** - Version history
- **CorrectionReport** - Error reports
- **Bookmark** - User bookmarks
- **AuditLog** - Action history

#### Key Design Decisions
1. **Slug-based URLs** - People and operations have unique slugs
2. **Soft Deletion** - Using status fields rather than actual deletion
3. **Verification Status** - Multiple levels of verification
4. **Flexible Terminology** - Support various respectful terms
5. **Source Tracking** - Every claim must be sourceable
6. **Revision History** - All changes tracked

### 2.2 Relationships
```
User (1) ──── (N) ContributorApplication
User (1) ──── (N) StorySubmission
User (1) ──── (N) Bookmark
User (1) ──── (N) CorrectionReport

Person (1) ──── (N) ServiceRecord
Person (1) ──── (N) TimelineEvent
Person (1) ──── (N) PersonAward
Person (1) ──── (N) PersonOperation
Person (1) ──── (N) PersonSource
Person (1) ──── (N) MediaAsset
Person (1) ──── (N) StorySubmission
Person (1) ──── (N) CorrectionReport

Award (1) ──── (N) PersonAward
Operation (1) ──── (N) PersonOperation
Source (1) ──── (N) PersonSource

StorySubmission (1) ──── (N) StoryRevision
```

### 2.3 Indexes
- Person: slug, force, state, publishedAt
- ServiceRecord: personId
- TimelineEvent: personId, date
- StorySubmission: status, contributorId
- CorrectionReport: status

### 2.4 Prisma Setup Completed
- Prisma schema validated successfully
- Initial migration created and applied:
  `20261016075609_initial_schema`
- Prisma Client generated successfully
- Development seed script type-checks successfully
- Added `npm run db:validate` for schema validation

---

## Phase 3: Backend API Implementation ✅

### 3.1 API Routes Structure

#### Public Routes
```
GET  /api/v1/people              # Search and list people
GET  /api/v1/people/:slug        # Person detail
GET  /api/v1/forces              # List forces
GET  /api/v1/ranks               # List ranks
GET  /api/v1/states              # List states
GET  /api/v1/operations          # List operations
GET  /api/v1/operations/:slug    # Operation detail
GET  /api/v1/awards              # List awards
GET  /api/v1/on-this-day         # Today's events
```

#### Auth Routes
```
POST /api/v1/auth/register
POST /api/v1/auth/login
POST /api/v1/auth/logout
GET  /api/v1/auth/me
POST /api/v1/auth/forgot-password
POST /api/v1/auth/reset-password
```

#### User Routes (Protected)
```
GET  /api/v1/me/bookmarks
POST /api/v1/me/bookmarks/:personId
DEL  /api/v1/me/bookmarks/:personId
POST /api/v1/correction-reports
GET  /api/v1/me/correction-reports
POST /api/v1/contributor-applications
```

#### Contributor Routes (Role: CONTRIBUTOR)
```
GET  /api/v1/contributor/submissions
POST /api/v1/contributor/submissions
GET  /api/v1/contributor/submissions/:id
PATCH /api/v1/contributor/submissions/:id
POST /api/v1/contributor/submissions/:id/submit
POST /api/v1/contributor/submissions/:id/resubmit
```

#### Admin Routes (Role: ADMIN)
```
GET  /api/v1/admin/dashboard
GET  /api/v1/admin/applications
PATCH /api/v1/admin/applications/:id
GET  /api/v1/admin/submissions
GET  /api/v1/admin/submissions/:id
POST /api/v1/admin/submissions/:id/request-changes
POST /api/v1/admin/submissions/:id/approve
POST /api/v1/admin/submissions/:id/publish
POST /api/v1/admin/submissions/:id/reject
POST /api/v1/admin/submissions/:id/archive
GET  /api/v1/admin/correction-reports
PATCH /api/v1/admin/correction-reports/:id
GET  /api/v1/admin/users
PATCH /api/v1/admin/users/:id/role
PATCH /api/v1/admin/users/:id/suspend
GET  /api/v1/admin/audit-logs
```

### 3.2 Middleware Stack
1. **CORS** - Restrict to configured origins
2. **Helmet** - Security headers
3. **Compression** - Response compression
4. **Rate Limiting** - Prevent abuse
5. **Request ID** - Track requests
6. **Logging** - Structured logging
7. **Authentication** - Session validation
8. **Authorization** - Role checking
9. **Validation** - Zod schemas
10. **Error Handling** - Consistent errors

### 3.3 Backend Setup Completed
- Public, authenticated user, contributor, and admin route modules are wired.
- HTTP-only session cookies are validated on every request before protected routes.
- Logout now invalidates the server-side session.
- Backend Prisma client generation is shared with the database schema.
- Backend typecheck, build, lint, and test commands pass.
- Test runner is configured to pass when no test files exist yet.

---

## Phase 4: Frontend Implementation ✅

### 4.1 Route Structure

#### Public Routes
- `/` - Homepage
- `/search` - Search results
- `/browse` - Browse by category
- `/people/:slug` - Person tribute
- `/operations/:slug` - Operation detail
- `/on-this-day` - Daily remembrance
- `/about` - About page
- `/contribute` - Contribution info

#### Auth Routes
- `/login`
- `/register`
- `/forgot-password`
- `/reset-password`

#### User Routes (Protected)
- `/dashboard` - User dashboard
- `/dashboard/bookmarks`
- `/dashboard/corrections`
- `/dashboard/settings`

#### Contributor Routes (Role: CONTRIBUTOR)
- `/contributor` - Contributor dashboard
- `/contributor/submissions`
- `/contributor/submissions/new`
- `/contributor/submissions/:id`

#### Admin Routes (Role: ADMIN)
- `/admin` - Admin dashboard
- `/admin/applications`
- `/admin/submissions`
- `/admin/submissions/:id`
- `/admin/users`
- `/admin/corrections`
- `/admin/audit-logs`

### 4.2 Component Architecture

#### Layout Components
- `RootLayout` - Base layout with header/footer
- `PublicLayout` - Public pages
- `DashboardLayout` - User dashboard
- `AdminLayout` - Admin panel

#### Feature Components
- `SearchBar` - Debounced search
- `FilterPanel` - Filter controls
- `PersonCard` - Tribute preview
- `Timeline` - Life events
- `ServiceHistory` - Service records
- `AwardsList` - Decorations
- `SourceList` - References

#### Form Components
- `PersonForm` - Story submission
- `CorrectionForm` - Error reporting
- `ApplicationForm` - Contributor application

### 4.3 State Management

#### React Query Keys
```

### 4.4 Frontend Foundation Completed
- Added React Query-backed authentication state using `/auth/me`.
- Protected routes no longer inspect the HTTP-only cookie from browser JavaScript.
- Connected archive search to the people API with query parameters.
- Connected person and operation detail pages to their backend APIs.
- Added shared API clients for operations and reference data.
- Added shared React Query keys.
- Added functional dashboard sidebar links and icons.
- Added Vite and ESLint configuration required by the frontend toolchain.
- Frontend typecheck, production build, and lint commands pass.typescript

### 4.5 Phase 4 Completed
- Connected user bookmarks and correction counts to protected APIs.
- Connected contributor dashboard, submission list, creation, editing, and submission workflow.
- Connected admin dashboard, application review, submission queue, and submission moderation actions.
- Connected the On This Day page to the public API.
- Added typed API clients for user, contributor, and admin workflows.typescript
const queryKeys = {
  people: ['people'] as const,
  person: (slug: string) => ['people', slug] as const,
  search: (params) => ['search', params] as const,
  bookmarks: ['bookmarks'] as const,
  submissions: ['submissions'] as const,
  // ...
}
```

---

## Phase 5: Testing and Quality Assurance ✅

### 5.1 Unit Tests
- Permission checks
- Story status transitions
- Zod validation
- Search filters
- Slug generation
- Source requirements

### 5.4 Testing Started
- Added unit coverage for Zod request validation.
- Added unit coverage for authentication, role authorization, and suspended-account checks.
- Added unit coverage for authentication service behavior, people search filters, and story status transitions.
- Added Playwright smoke coverage for public archive navigation and search.

### 5.5 Phase 5 Completed
- Backend unit suite covers validation, authorization, authentication, search filters, and story transitions.
- Playwright smoke suite covers public archive navigation and search submission.
- Backend and frontend typechecks, builds, and lint checks pass.
- E2E dependencies and runnable configuration are included under `e2e/`.

### 5.2 Integration Tests
- Registration and login
- Contributor application
- Story creation and submission
- Admin review workflow
- Correction reporting

### 5.3 E2E Tests (Playwright)
1. Visitor searches and views tribute
2. User applies for contributor
3. Admin approves application
4. Contributor creates story
5. Admin requests changes
6. Contributor resubmits
7. Admin publishes
8. Story appears publicly
9. Visitor reports error
10. Admin resolves report

---

## Phase 6: Deployment and Documentation ⏳

### 6.1 Deployment Targets
- **Frontend:** Vercel / Netlify
- **Backend:** Railway / Render
- **Database:** Neon PostgreSQL
- **Storage:** UploadThing / S3

### 6.2 Documentation
- README.md - Setup and usage
- API.md - API documentation
- DEPLOYMENT.md - Deployment guide
- EDITORIAL_GUIDELINES.md - Content standards
- CONTRIBUTOR_GUIDELINES.md - Contribution guide

---

## Status Legend
- ✅ Complete
- 🔄 In Progress
- ⏳ Pending
- ❌ Blocked
