# Deploying SafeX to GitHub + Netlify

This project is **three separate apps** (`client`, `admin`, `server`). They need to be
pushed as **one GitHub repo**, but deployed as **three separate Netlify sites** — one
per folder. That's the standard way to deploy a monorepo like this on Netlify, and it's
what was missing before (which is why client/admin/server were out of sync).

## 1. Push to GitHub

```bash
cd safex-solutions-platform
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/<your-username>/<your-repo>.git
git push -u origin main
```

`server/.env` is already excluded by `.gitignore` — do **not** remove that rule, and
don't paste real secrets into any tracked file.

> ⚠️ **Rotate your credentials before going live.** The `server/.env` file you shared
> with me contains a live MongoDB Atlas username/password, a JWT secret, and an admin
> bcrypt hash. Since that file passed through this conversation, treat those values as
> no longer private: in MongoDB Atlas, change the database user's password (Database
> Access → your user → Edit → Edit Password), and generate a fresh `JWT_SECRET` (any
> long random string works, e.g. `openssl rand -hex 32`). Use the new values in step 3,
> not the old ones.

## 2. Create three Netlify sites from the same repo

In Netlify: **Add new site → Import an existing project**, pick your GitHub repo, and
repeat this three times with three different **Base directory** values. Each site
already has its own `netlify.toml` (in `client/`, `admin/`, `server/`), so once the
base directory is set, Netlify picks up the right build settings automatically.

| Site (suggested name) | Base directory | What it serves |
|---|---|---|
| `safex-client`  | `client` | The public website |
| `safex-admin`   | `admin`  | The admin portal |
| `safex-api`     | `server` | The Express API, as Netlify Functions |

For each, leave "Build command" / "Publish directory" as detected from `netlify.toml`
(don't need to fill them in manually).

## 3. Set environment variables per site

**`safex-api` site** (Site settings → Environment variables):
```
MONGODB_URI=<your new connection string>
JWT_SECRET=<a new long random secret>
ADMIN_EMAIL=<your admin email>
ADMIN_PASSWORD_HASH=<bcrypt hash from `npm run hash-password`>
CLIENT_URL=https://safex-client.netlify.app
ADMIN_URL=https://safex-admin.netlify.app
```
Use the **real URLs Netlify gives your client/admin sites** (or your custom domains) —
the API only accepts requests from the origins listed in `CLIENT_URL`/`ADMIN_URL`, so
if these don't match exactly, requests will fail with a CORS error in the browser
console even though the API itself is healthy.

**`safex-client` site:**
```
VITE_API_URL=https://safex-api.netlify.app/api
```

**`safex-admin` site:**
```
VITE_API_URL=https://safex-api.netlify.app/api
```
Use the real URL Netlify gives your `safex-api` site.

After setting these, trigger a redeploy on all three sites (env vars only take effect
on the next build, not retroactively).

## 4. Verify

1. `https://safex-api.netlify.app/api/health` → should return `{"ok":true,"service":"safex-api"}`.
2. `https://safex-client.netlify.app` → homepage loads, services load, submitting a
   request returns a Request ID, and refreshing on a route like `/services` or
   `/track-request` does **not** 404.
3. `https://safex-admin.netlify.app` → log in with `ADMIN_EMAIL` / the password you
   hashed, requests and reviews load, and refreshing the page keeps you logged in
   (it does, via `sessionStorage`).

## What was actually broken

- `server/netlify/functions/api.js` mixed two incompatible Netlify Functions formats
  (v2's `export default (req, context)` Fetch-style handler with `serverless-http`,
  which only understands the classic `(event, context)` Lambda-style signature). This
  meant the deployed API function could never correctly process a request — this was
  the main reason nothing worked once deployed. Fixed to use the classic
  `export const handler` signature, matching the redirect rule already in
  `server/netlify.toml`.
- `client/` and `admin/` had no `netlify.toml`, so Netlify had no build command, no
  publish directory, and no single-page-app fallback redirect — any route besides `/`
  would 404 on refresh or direct load. Added one to each.
- Nothing pinned a Node version, and Vite 7 needs Node 20.19+; added `NODE_VERSION =
  "20"` to all three `netlify.toml` files so Netlify's build matches what the project
  actually needs.
- `server/.env` had a malformed `JWT_SECRET` line (the key was accidentally duplicated
  inside the value). Fixed locally — but since this file only matters for local
  development, it won't affect Netlify (see step 3).
