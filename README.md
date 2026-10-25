# J.A.R.V.I.S. Web UI Preview (Frontend Only)

A responsive React + TypeScript + Vite UI preview. This project does not connect to the Kotlin backend, AI APIs, phone controls, microphone recognition, or live device telemetry.

## Publish on GitHub Pages

1. Create a GitHub repository.
2. Extract this project ZIP and upload the **contents of the `jarvis-web-ui` folder** to the repository root. The root should contain `package.json`, `index.html`, `src/`, `public/`, `vite.config.ts`, and `.github/`.
3. Commit the files to the `main` (or `master`) branch.
4. In GitHub, open **Settings → Pages**.
5. Under **Build and deployment → Source**, choose **GitHub Actions**.
6. Open the **Actions** tab and wait for **Deploy JARVIS UI to GitHub Pages** to finish successfully.
7. The site URL will be shown in the deployment job, usually `https://YOUR-USERNAME.github.io/YOUR-REPOSITORY/`.

The included workflow automatically builds the Vite site and deploys it. It also configures the correct base path for a project repository and for a `USERNAME.github.io` repository.

## Run locally

Requires Node.js 20+ (Node.js 22 recommended).

```bash
npm install
npm run dev
```

## Build locally

```bash
npm run build
npm run preview
```

## Notes

- This is frontend-only; all responses and device values are demo data.
- The face uses the included Three.js assets and existing GLB mesh.
- No API keys are needed.


## Hologram refinement

The central 2D hologram now uses a larger cyan wireframe face, stronger translucent cylinder walls, brighter vertical glass edges, more visible scan lines, and a moving scan beam. The existing face canvas continues to animate the mouth when the UI preview enters its simulated speaking state. `SHOW MORE` is designed to show its feature carousel inside the central hologram rather than opening the full-screen drawer. This remains a frontend-only preview; microphone phoneme tracking and real device actions are not connected.
