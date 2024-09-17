import react from '@vitejs/plugin-react'
import autoImport from 'unplugin-auto-import/vite'
import { defineConfig } from 'vite'
import tsconfigPaths from 'vite-tsconfig-paths'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react({
      jsxRuntime: 'classic',
    }),
    autoImport({ imports: ['react'] }),
    tsconfigPaths(),
  ],
})
