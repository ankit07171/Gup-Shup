import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'

import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(),tailwindcss()],
  server:{
    port:7171,
    proxy: {
			"/api": {
				target: "https://gup-shup-n120zrt1u-ankit07171s-projects.vercel.app/",
        changeOrigin:true
			},
  },
}
})
