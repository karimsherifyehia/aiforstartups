import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';

export default defineConfig({
  site: 'https://aiforstartups.io',
  integrations: [
    tailwind(),
  ],
  output: 'static',
});
