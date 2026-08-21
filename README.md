# SafeX Solutions — Full-Stack Services & Pricing Platform

This project contains **three separate apps**:

- `client/` — public React website
- `admin/` — React admin portal
- `server/` — Express + MongoDB API

## Why it may not run in VS Code

The original project is not a single `npm run dev` application. Each folder has its own dependencies and must be installed separately.

The backend also needs a MongoDB connection and JWT configuration. Without `server/.env`, the API intentionally stops instead of starting with unsafe/default credentials.

## Requirements

- **Node.js 20.19+** (recommended; Vite 7 requires a modern Node version)
- npm
- MongoDB Atlas or a local MongoDB server

Check your versions:

```bash
node -v
npm -v
```

## Recommended VS Code setup

Open the **`safex-solutions-platform` root folder** in VS Code.

### 1. Install all dependencies

From the root:

```bash
npm install
npm run install:all
```

Or install manually:

```bash
cd client
npm install

cd ../admin
npm install

cd ../server
npm install
```

### 2. Configure the backend

Copy:

```text
server/.env.example
```

to:

```text
server/.env
```

Then set:

```env
PORT=5000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=use_a_long_random_secret
ADMIN_EMAIL=admin@example.com
ADMIN_PASSWORD_HASH=your_bcrypt_hash
CLIENT_URL=http://localhost:5173
ADMIN_URL=http://localhost:5174
```

Generate a bcrypt password hash with:

```bash
cd server
npm run hash-password
```

Copy the generated hash into `ADMIN_PASSWORD_HASH`.

### 3. Start the project

You can run the apps separately in three VS Code terminals:

**Terminal 1 — API**
```bash
cd server
npm run dev
```

**Terminal 2 — Public website**
```bash
cd client
npm run dev
```

**Terminal 3 — Admin**
```bash
cd admin
npm run dev
```

Or, after installing the root dependencies, run everything together:

```bash
npm run dev
```

The usual URLs are:

- Public website: `http://localhost:5173`
- Admin portal: `http://localhost:5174`
- API health check: `http://localhost:5000/api/health`

## Important

If the public website opens but requests/reviews do not work, check the API first:

```text
http://localhost:5000/api/health
```

It should return:

```json
{
  "ok": true,
  "service": "safex-api"
}
```

If the API does not start, check `server/.env` and make sure:

1. `MONGODB_URI` is valid.
2. MongoDB Atlas allows your current IP address.
3. `JWT_SECRET` is present.
4. `ADMIN_EMAIL` is present.
5. `ADMIN_PASSWORD_HASH` is a valid bcrypt hash.

## Project structure

```text
safex-solutions-platform/
├── client/
├── admin/
├── server/
├── package.json
├── .gitignore
└── README.md
```

## Security

Do not commit:

- `.env`
- MongoDB credentials
- JWT secrets
- admin passwords
- API keys

The `.gitignore` already excludes environment files.

## Deploying to GitHub + Netlify

See [`DEPLOYMENT.md`](./DEPLOYMENT.md) for the full step-by-step guide (three
Netlify sites from one repo, with the exact environment variables each needs).

## Production notes

Before deployment:

1. Use HTTPS.
2. Use a strong random JWT secret.
3. Restrict MongoDB network access.
4. Set production `CLIENT_URL` and `ADMIN_URL`.
5. Use a trusted live exchange-rate provider if live pricing is required.
6. Add email notifications/CAPTCHA if needed.
7. Verify company statistics and service information before publishing.
