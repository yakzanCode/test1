import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import ViteSitemapPlugin from 'vite-plugin-sitemap'

export default defineConfig({
  plugins: [
    react(),
    ViteSitemapPlugin({
      hostname: 'https://yourdomain.com',  // Replace with your domain
      routes: [
        '/',
        '/products',
        '/about',
        '/contact'
      ]
    })
  ],
  gzip: true,
  build: {
    outDir: 'dist'
  }
})
