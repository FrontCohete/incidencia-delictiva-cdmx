import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import proteccion from './plugins/proteccion.js'
import seo from './plugins/seo.js'

export default defineConfig(({ mode }) => {
  const entorno = loadEnv(mode, process.cwd(), 'VITE_')

  return {
    base: './',
    plugins: [react(), proteccion(entorno), seo(entorno)],
    css: {
      modules: { localsConvention: 'camelCaseOnly' },
    },
    build: {
      target: 'es2022',
      sourcemap: false,
      assetsInlineLimit: 0,
      reportCompressedSize: false,
    },
  }
})
