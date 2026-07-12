# Meridian

A travel atelier landing site — a bespoke travel planner whose premise is that
the *client* is the editor of their own journey, and the studio arranges
everything else.

React + TypeScript + Vite, Tailwind v4, and two hand-written WebGL pieces.

## Running it

```bash
npm install
npm run dev        # http://localhost:5173
```

```bash
npm run build      # typecheck + production bundle into dist/
npm run preview    # serve the built bundle locally
```

## Deploying to GitHub Pages

Configured as a **project site**, served from
`https://<your-username>.github.io/meridian/`.

1. Create a repo named `meridian` and push this code to it.
2. Set `homepage` in `package.json` to your actual username.
3. Deploy:

   ```bash
   npm run deploy
   ```

   This builds and pushes `dist/` to a `gh-pages` branch.
4. In the repo: **Settings → Pages → Build and deployment → Deploy from a
   branch**, and select `gh-pages` / root.

Two details that make Pages work, in case they ever need changing:

- **`base: "/meridian/"`** in `vite.config.ts` — asset URLs need the repo name
  prefixed. If you rename the repo, change this to match or every asset 404s.
- **`dist/404.html`** is written at build time as a copy of `index.html`. Pages
  can't rewrite unknown paths to the app shell, so without it a deep link like
  `/meridian/stays` would 404 on refresh or when shared. Pages serves `404.html`
  for anything it can't find, the app boots, and the router renders the right
  route.

## Notable pieces

- `src/components/HeroWaves.tsx` — the hero photograph animated in a WebGL
  shader: its UVs are warped by summed sine swells travelling shoreward, with an
  asymmetric swash cycle (a ~3s uprush, a ~6s drain) running the surf up the sand
  and back. Honours `prefers-reduced-motion`.
- `src/components/Globe.tsx` — a three.js Earth (NASA Blue Marble textures, cloud
  layer, atmospheric rim shader) with the eight destinations pinned at their true
  coordinates. Drag to spin; hover a marker for its name.
- `src/pages/Stories.tsx` — travellers can publish their own dispatch; it's stored
  in `localStorage` and gets a real URL of its own.

## Images

`IMAGE-PROMPTS.md` has a generation prompt for every image slot on the site. The
files currently in `src/assets/` for stays, experiences and galleries are
**placeholders** — generate a replacement, overwrite the file with the same name,
and it appears with no code changes.
