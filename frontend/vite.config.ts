import react from "@vitejs/plugin-react";
import path from "path";
import { defineConfig } from "vite";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/api": {
        target: "http://localhost:5001",
        changeOrigin: true,
      },
    },
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
      "@assets": path.resolve(__dirname, "src/assets"),
      "@features": path.resolve(__dirname, "src/features"),
      "@components": path.resolve(__dirname, "src/components"),
      "@constants": path.resolve(__dirname, "src/constants"),
      "@contexts": path.resolve(__dirname, "src/contexts"),
      "@hooks": path.resolve(__dirname, "src/hooks"),
      "@pages": path.resolve(__dirname, "src/pages"),
      "@styles": path.resolve(__dirname, "src/styles"),
      "@utils": path.resolve(__dirname, "src/utils"),
    },
  },
});
