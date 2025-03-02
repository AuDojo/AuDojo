/// <reference types="vitest/config" />

import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";

// https://vitejs.dev/config/
export default defineConfig({
  base: "/projects/audojo/",
  plugins: [
    react({
      babel: {
        plugins: [["babel-plugin-react-compiler", { target: "19" }]],
      },
    }),
    tsconfigPaths(),
  ],
  server: {
    open: true,
    proxy: {
      "/api": {
        target: "http://localhost:5002/projects/audojo",
        changeOrigin: true,
      },
    },
  },
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: "./src/testing/setup.ts",
    exclude: ["**/node_modules/**", "**/e2e/**"],
    coverage: {
      include: ["src/**"],
      exclude: ["**/index.ts"],
    },
  },
});
