import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'


// https://vite.dev/config/
export default defineConfig({
  plugins: [react(),
  tailwindcss(),
  ],
  build: {
    outDir: 'build', // Change 'dist' to 'build'
  },
  server: {
    proxy: {
      '/product/items': 'http://localhost:5001'
    }
  },
  esbuild: {
    jsxInject: `import React from 'react'`, // Optional: Auto-import React if needed
    loader: 'jsx', // Ensure JSX is parsed in .js files
    include: ['src/**/*.js', 'src/**/*.jsx'] // Include both .js and .jsx files
  }
})
