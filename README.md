# Travel Port Leisure

Landing site for Travel Port Leisure (Private) Limited — www.tpleisure.lk.
React + TypeScript + Vite, Tailwind v4, three.js globe.

All company wording lives in `src/tpl.ts`, transcribed from the corporate deck
(`reference/`, not committed). Change copy there, not in the pages.

## Run

```bash
npm install
npm run dev        # http://localhost:5173
npm run build      # typecheck + production bundle into dist/
npm run preview    # serve dist/ locally
```

## Deploy

Builds to static files served from the domain root (`base: "/"`). Each route
(`/`, `/about`, `/contact`) is emitted as its own `index.html` so every page
returns HTTP 200 on any static host; `404.html` covers unknown paths.

- **Vercel:** import the repo; framework preset Vite. `vercel.json` handles routing.
- **GitHub Pages:** publish `dist/` (Actions or a `gh-pages` branch) and set the
  custom domain in Settings → Pages.

See `docs/DOMAIN-HANDOVER.md` for the DNS changes the client makes.

## Not yet built

- The enquiry form opens the visitor's mail app (mailto) — no backend yet.
- Social links are omitted until the client supplies the profile URLs.
