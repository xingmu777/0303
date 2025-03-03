import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from "path";

// https://vite.dev/config/
export default defineConfig({
  plugins: [vue()],
  server: {
    open:true,
    proxy: {
      "/api": {
        target: "hrrp://127.0.0.1:9527",
        rewrite: (path)=>path.replace(/\/api/,""),
      }
    }
  },
  resolve: {
    alias: {
      "@":path.resolve(__dirname,"./src"),
    },
  },

})
