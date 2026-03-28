import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    allowedHosts: ["lora-lozengy-mitzi.ngrok-free.dev"], // must be an array of strings
    port: 5173,
    host: true,
  },
})
