# J.A.R.V.I.S. 2D Face + Show More Fix

Replace these files in the repository (keep the same paths):
- `src/main.tsx`
- `public/3d/jarvis-avatar.html`

Changes:
- `SHOW MORE` toggles the hologram's rotating feature-module carousel inside the existing face viewport; it no longer opens the full-screen drawer.
- Face linework is larger, brighter, and denser; the clipped duplicate status caption inside the iframe is removed.
- The mouth animation responds to the existing `setSpeaking()` and `pulseAudio()` calls.

Important: the current web project is explicitly a UI preview. Mouth motion is driven by the UI's simulated speaking state, not real microphone phonemes or connected TTS audio.
