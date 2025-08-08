import { defineConfig } from "vite";

export default defineConfig({
  server: {
    port: 5173,
    open: true,
    // Opcional: proxy para json-server
    // proxy: {
    //   "/api": {
    //     target: "http://localhost:3333",
    //     changeOrigin: true,
    //     rewrite: (path) => path.replace(/^\/api/, ""),
    //   },
    // },
  },
});
