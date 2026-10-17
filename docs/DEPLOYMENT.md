# Deployment Guide

## Prerequisites

- Node.js 18+
- PostgreSQL database (Neon recommended)
- Storage service (UploadThing or S3-compatible)

## Environment Variables

### Database

```bash
DATABASE_URL="postgresql://..."
DIRECT_DATABASE_URL="postgresql://..."
```

### Backend

```bash
PORT=3000
NODE_ENV=production
SESSION_SECRET="minimum-32-characters-secure-random-string"
FRONTEND_URL="https://your-frontend-domain.com"
CORS_ORIGIN="https://your-frontend-domain.com"
```

### Frontend

```bash
VITE_API_URL="https://your-api-domain.com/api/v1"
VITE_APP_NAME="Veeranjali"
```

## Deployment Steps

### 1. Database Setup

```bash
# Navigate to database directory
cd database

# Install dependencies
npm install

# Generate Prisma client
npm run prisma:generate

# Run migrations
npm run prisma:migrate:prod

# Seed database (optional, for initial data)
npm run prisma:seed
```

### 2. Backend Deployment

```bash
# Navigate to backend directory
cd backend

# Install dependencies
npm install

# Build
npm run build

# Start
npm start
```

### 3. Frontend Deployment

```bash
# Navigate to frontend directory
cd frontend

# Install dependencies
npm install

# Build
npm run build

# The dist/ folder contains the production build
```

## Hosting Recommendations

### Frontend
- Vercel
- Netlify
- Cloudflare Pages

### Backend
- Railway
- Render
- Fly.io

### Database
- Neon (PostgreSQL)

## Production Checklist

- [ ] Environment variables configured
- [ ] Database migrations run
- [ ] Session secret is secure (32+ random characters)
- [ ] CORS configured for production domain
- [ ] HTTPS enabled
- [ ] Rate limiting configured
- [ ] Error logging configured
- [ ] Monitoring set up
- [ ] Backup strategy in place

## Security Considerations

1. **Secrets Management**
   - Never commit secrets to git
   - Use environment variables
   - Rotate secrets periodically

2. **Database Security**
   - Use SSL connections
   - Restrict IP access if possible
   - Regular backups

3. **API Security**
   - Rate limiting enabled
   - CORS restricted
   - Helmet middleware enabled
   - Input validation on all endpoints

4. **Authentication**
   - HTTP-only cookies
   - Secure flag in production
   - Session expiration
