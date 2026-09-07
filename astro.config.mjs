// @ts-check
import { defineConfig } from 'astro/config'
import react from '@astrojs/react'

export default defineConfig({
  site: 'https://www.daniel-choi.com',
  integrations: [react()],
  // Match GitHub Pages: directory URLs carry a trailing slash, and a request
  // without one is redirected rather than 404'd. Keeps local == production,
  // and keeps /history/v1..v3 (plain files in public/) resolving the same way.
  trailingSlash: 'ignore',

  build: { format: 'directory' },
})
