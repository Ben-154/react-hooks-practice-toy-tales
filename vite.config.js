import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'

function treatJsFilesAsJsx() {
  return {
    name: 'treat-js-files-as-jsx',
    enforce: 'pre',
    async transform(code, id) {
      if (!id.match(/src\/.*\.js$/)) {
        return null
      }

      const esbuild = await import('esbuild')
      return esbuild.transform(code, {
        loader: 'jsx',
        jsx: 'automatic',
        sourcemap: true,
      })
    },
  }
}

export default defineConfig({
  plugins: [react(), treatJsFilesAsJsx()],
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: './src/__tests__/setup.jsx',
  },
})
