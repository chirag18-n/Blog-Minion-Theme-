import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/api": {
        target: "https://blog-api-74l6.onrender.com/",
        changeOrigin: true,
        secure: false,
      },
    },
  },
});
