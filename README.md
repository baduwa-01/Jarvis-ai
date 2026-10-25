# J.A.R.V.I.S. Exact Reference Dashboard

This Vite + React + TypeScript web UI uses the supplied dashboard artwork as the visual base so the initial dashboard matches the provided reference image exactly. Transparent accessible hotspots provide clickable dashboard controls, quick access, a feature-module overlay, and a message composer. The UI is a frontend preview; device actions and AI backend calls are not connected.

## Run locally

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
```

## GitHub Pages

The included `vite.config.ts` and `.github/workflows/deploy.yml` from the existing project should be kept when merging this dashboard into the existing repository. The reference image is stored at `public/jarvis-reference-dashboard.png`.
