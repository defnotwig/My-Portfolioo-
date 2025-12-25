Quick Vercel deploy steps for this portfolio

Frontend (client)

- From the Vercel dashboard: import repository → set Project Root to `client`.
- Ensure build settings (Vite):
  - Build Command: `npm run build`
  - Output Directory: `dist`
  - Install Command: `npm install`
- Add any client environment variables in Project Settings.
- Deploy via dashboard or CLI:

```bash
# from repo root
cd client
vercel --prod
```

Backend (server) — serverless on Vercel

Notes: The backend has been converted to a serverless handler. The server will connect to MongoDB on first cold-start. Seeding is disabled by default.

1. Add required environment variables in Vercel Project Settings for the `server` project:
   - `MONGODB_URI` = your MongoDB connection string
   - `OPENAI_API_KEY` = your OpenAI API key (if used)
   - `CLIENT_ORIGIN` = URL of deployed frontend (optional)
   - (optional) `SEED_ON_BOOT` = `true` to run seed on first cold-start (use with caution)
2. In Vercel dashboard: import repo → set Project Root to `server`.
   - Vercel should detect a Node project. If not, set:
     - Build Command: `npm install`
     - Output Directory: (leave empty; `@vercel/node` handles serverless functions)
3. Deploy via dashboard or CLI:

```bash
# from repo root
cd server
vercel --prod
```

Verify

- Health check (backend):

```bash
curl https://<your-server-url>/api/health
# expect: {"status":"ok"}
```

- Frontend: open the frontend Vercel URL and test pages that call the API.

Troubleshooting

- If seeding wiped data unexpectedly, set `SEED_ON_BOOT` to blank and re-seed manually using the `server` script:

```bash
cd server
npm run seed
```

- If CORS blocks requests, add your frontend URL to the `CLIENT_ORIGIN` env var or to the allowed origins in `server/src/index.js`.

Advanced: single-repo multi-project

- Create two Vercel projects from the same repo; set Project Root to `client` and `server` respectively. Manage env vars per project.

Contact

If you want, I can also:

- Convert seeding to an idempotent upsert mode and add a manual seed script endpoint.
- Update `server/vercel.json` to a different routing scheme.
