# Assay — frontend

Next.js App Router site for **Assay**: editorial craft profiles with Issues, Discover, and Google sign-in.

## Stack

- Next.js 15 · React 19 · TypeScript · Tailwind
- Auth.js / NextAuth (Google)
- Framer Motion (reveals)

## Structure

```
src/
  app/                 # Routes only (thin)
    (site)/            # Home, issues, discover, signin
    api/auth/          # NextAuth handlers
  components/          # Shared UI, layout, motion
  features/            # Domain modules (home, issues, discover, auth)
  data/                # Seed issues / discover projections
  config/              # Site + craft criteria
  lib/                 # auth, utils
  types/               # Shared TypeScript types
```

## Develop

```bash
cd frontend
cp .env.example .env.local
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

### Google auth

1. Create OAuth credentials in Google Cloud Console
2. Authorized redirect URI: `http://localhost:3000/api/auth/callback/google`
3. Set `GOOGLE_CLIENT_ID`, `GOOGLE_CLIENT_SECRET`, `NEXTAUTH_SECRET` in `.env.local`

Without those vars, the Google button stays disabled and **Continue as reader** works for local testing.
