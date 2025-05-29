import { defineConfig } from "vite"
import react from "@vitejs/plugin-react"
import { resolve } from "path"

export default defineConfig({
  plugins: [react()],
  define: {
    global: {}, // 👈 Fixes "global is not defined"
  },
  server: {
    proxy: {
      "/api": {
        target: "http://localhost:8080",
        changeOrigin: true,
      },
      "/ws": {
        target: "http://localhost:8080",
        ws: true,
        changeOrigin: true,
      },
      "/socket.io": {
        target: "http://localhost:8080",
        ws: true,
        changeOrigin: true,
      },
    },
  },
  resolve: {
    alias: {
      // Optional: support absolute imports like "@/components"
      "@": resolve(__dirname, "src"),
    },
  },
})
