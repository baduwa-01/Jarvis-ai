import { defineConfig } from 'vite';

// GitHub Pages needs /REPOSITORY_NAME/ for project sites.
// For USERNAME.github.io repositories, the site is served from /.
const repository = (process.env.GITHUB_REPOSITORY || '').split('/')[1] || '';
const base = process.env.GITHUB_ACTIONS === 'true'
  ? (repository.endsWith('.github.io') ? '/' : `/${repository}/`)
  : '/';

export default defineConfig({ base });
