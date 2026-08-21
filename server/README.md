# SafeX API

Express REST API for the SafeX client website and separate admin portal.

## Environment

Copy `.env.example` to `.env`.

Required:
- MONGODB_URI
- JWT_SECRET
- ADMIN_EMAIL
- ADMIN_PASSWORD_HASH
- CLIENT_URL
- ADMIN_URL

## Admin password

Run:

```bash
npm run hash-password
```

Do not put the actual password in source code or GitHub.

## API

- GET `/api/health`
- POST `/api/auth/login`
- GET `/api/services`
- POST `/api/requests`
- POST `/api/requests/track`
- GET `/api/requests/admin` (admin)
- PATCH `/api/requests/admin/:id/status` (admin)
- DELETE `/api/requests/admin/:id` (admin, rejected only)
- GET `/api/reviews`
- POST `/api/reviews`
- GET `/api/reviews/admin` (admin)
- PATCH `/api/reviews/admin/:id` (admin)
- DELETE `/api/reviews/admin/:id` (admin)
