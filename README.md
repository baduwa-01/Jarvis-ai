# J.A.R.V.I.S. Web UI Preview (Frontend Only)

A responsive React + TypeScript + Vite website to preview the J.A.R.V.I.S. mobile UI in a browser. It is intentionally frontend-only: no Kotlin backend, AI provider, microphone capture, device permissions, phone control, or live telemetry is connected. Buttons show sample UI states only.

## Requirements
- Node.js 20+ (Node.js 22 recommended)
- npm

## Run locally
```bash
npm install
npm run dev
```
Open the local URL printed by Vite, usually `http://localhost:5173`.

## Production build
```bash
npm run build
npm run preview
```
The static production output is created in `dist/`. Upload the contents of `dist/` to any static hosting service.

## 3D avatar
The existing Three.js avatar HTML and assets are copied into `public/3d/` and shown in an iframe. The face uses the existing GLB mesh; no lip-sync or Kotlin/JARVIS logic is connected. The SHOW MORE UI controls are preview-only.

## Notes
- Weather, battery, RAM, network, tasks and logs use sample display data.
- The chat form updates a local preview reply only; it does not send data anywhere.
- No API keys are required.
