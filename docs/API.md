# Veeranjali API Documentation

## Overview

Veeranjali provides a RESTful API for accessing the digital memorial archive.

**Base URL:** `/api/v1`

## Authentication

The API uses session-based authentication with HTTP-only cookies.

### Endpoints

#### Register
```
POST /api/v1/auth/register
```

**Body:**
```json
{
  "name": "string",
  "email": "string",
  "password": "string (min 8 chars)"
}
```

#### Login
```
POST /api/v1/auth/login
```

**Body:**
```json
{
  "email": "string",
  "password": "string"
}
```

#### Logout
```
POST /api/v1/auth/logout
```

#### Get Current User
```
GET /api/v1/auth/me
```

## Public Endpoints

### People

#### Search People
```
GET /api/v1/people
```

**Query Parameters:**
- `q` - Search query
- `force` - Filter by force
- `rank` - Filter by rank
- `state` - Filter by state
- `operation` - Filter by operation
- `award` - Filter by award
- `year` - Filter by year
- `page` - Page number (default: 1)
- `limit` - Results per page (default: 20, max: 100)
- `sort` - Sort field (name, dateOfDeath, publishedAt)
- `order` - Sort order (asc, desc)

#### Get Person by Slug
```
GET /api/v1/people/:slug
```

### Operations

#### List Operations
```
GET /api/v1/operations
```

#### Get Operation by Slug
```
GET /api/v1/operations/:slug
```

### Reference Data

#### Get Forces
```
GET /api/v1/forces
```

#### Get Ranks
```
GET /api/v1/ranks
```

#### Get States
```
GET /api/v1/states
```

#### Get Awards
```
GET /api/v1/awards
```

#### On This Day
```
GET /api/v1/on-this-day
```

## User Endpoints (Authentication Required)

### Bookmarks

#### Get Bookmarks
```
GET /api/v1/me/bookmarks
```

#### Add Bookmark
```
POST /api/v1/me/bookmarks/:personId
```

#### Remove Bookmark
```
DELETE /api/v1/me/bookmarks/:personId
```

### Correction Reports

#### Create Correction Report
```
POST /api/v1/correction-reports
```

**Body:**
```json
{
  "personId": "string",
  "message": "string (min 10 chars)",
  "supportingSourceUrl": "string (optional)"
}
```

### Contributor Application

#### Submit Application
```
POST /api/v1/contributor-applications
```

**Body:**
```json
{
  "reason": "string (min 50 chars)",
  "relevantExperience": "string (optional)",
  "supportingLinks": "string (optional)"
}
```

## Contributor Endpoints (Role: CONTRIBUTOR)

### Submissions

#### List Submissions
```
GET /api/v1/contributor/submissions
```

#### Create Submission
```
POST /api/v1/contributor/submissions
```

**Body:**
```json
{
  "title": "string",
  "content": "string (min 100 chars)",
  "structuredData": "object (optional)"
}
```

#### Get Submission
```
GET /api/v1/contributor/submissions/:id
```

#### Update Submission
```
PATCH /api/v1/contributor/submissions/:id
```

#### Submit for Review
```
POST /api/v1/contributor/submissions/:id/submit
```

#### Resubmit
```
POST /api/v1/contributor/submissions/:id/resubmit
```

## Admin Endpoints (Role: ADMIN)

### Dashboard
```
GET /api/v1/admin/dashboard
```

### Applications

#### List Applications
```
GET /api/v1/admin/applications
```

#### Review Application
```
PATCH /api/v1/admin/applications/:id
```

**Body:**
```json
{
  "status": "APPROVED | REJECTED",
  "adminNote": "string (optional)"
}
```

### Submissions

#### List Submissions
```
GET /api/v1/admin/submissions
```

#### Request Changes
```
POST /api/v1/admin/submissions/:id/request-changes
```

#### Approve
```
POST /api/v1/admin/submissions/:id/approve
```

#### Publish
```
POST /api/v1/admin/submissions/:id/publish
```

#### Reject
```
POST /api/v1/admin/submissions/:id/reject
```

#### Archive
```
POST /api/v1/admin/submissions/:id/archive
```

### Users

#### List Users
```
GET /api/v1/admin/users
```

#### Update Role
```
PATCH /api/v1/admin/users/:id/role
```

**Body:**
```json
{
  "role": "USER | CONTRIBUTOR | ADMIN"
}
```

#### Suspend User
```
PATCH /api/v1/admin/users/:id/suspend
```

**Body:**
```json
{
  "suspended": true | false
}
```

### Corrections

#### List Corrections
```
GET /api/v1/admin/correction-reports
```

#### Resolve
```
PATCH /api/v1/admin/correction-reports/:id
```

### Audit Logs
```
GET /api/v1/admin/audit-logs
```

## Response Format

### Success
```json
{
  "data": {},
  "meta": {
    "page": 1,
    "pageSize": 20,
    "total": 100,
    "totalPages": 5
  }
}
```

### Error
```json
{
  "error": {
    "code": "ERROR_CODE",
    "message": "Error description",
    "fields": {}
  }
}
```

## Error Codes

- `VALIDATION_ERROR` - Invalid request data
- `UNAUTHORIZED` - Authentication required
- `FORBIDDEN` - Insufficient permissions
- `NOT_FOUND` - Resource not found
- `RATE_LIMIT_EXCEEDED` - Too many requests
- `INTERNAL_ERROR` - Server error
