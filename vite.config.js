import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// Vite 7 + React 19 (JSX) + Tailwind CSS v4 (configuración CSS-first en src/index.css).
// Sin `tailwind.config.js`: los tokens viven en el bloque `@theme` de src/index.css.

// En desarrollo y en la vista previa, `/api` viaja al servidor de checkout
// (`server/`, puerto 4242). En producción se configura `VITE_API_URL` con la URL
// del servicio desplegado (Render).
const apiProxy = {
  '/api': {
    target: 'http://localhost:4242',
    changeOrigin: true,
  },
}

export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: { proxy: apiProxy },
  preview: { proxy: apiProxy },
})
