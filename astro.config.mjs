import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  site: 'https://juvantia.org',
  integrations: [react(), sitemap()],
  output: 'static',
  compressHTML: true,
  build: {
    assets: 'assets',
    inlineStylesheets: 'auto',
  },
});