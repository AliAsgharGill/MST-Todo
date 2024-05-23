import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/api": {
        target: "http://www.randomnumberapi.com",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, "/api/v1.0/random"),
      },
    },
  },
});
