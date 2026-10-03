import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';

// SITE_URL and BASE_PATH are set by the deploy workflow. Defaults suit a project
// page for this repo; a <username>.github.io repo or custom domain uses base ''.
const site = process.env.SITE_URL || 'https://aditjain01.github.io';
const base = process.env.BASE_PATH ?? '/aditjain01';

export default defineConfig({
  site,
  base,
  output: 'static',
  trailingSlash: 'ignore',
  integrations: [mdx(), sitemap()],
  build: { inlineStylesheets: 'auto' },
});
