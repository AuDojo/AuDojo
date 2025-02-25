/// <reference types="vitest/config" />

import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react({
      babel: {
        plugins: [["babel-plugin-react-compiler", { target: "19" }]],
      },
    }),
    tsconfigPaths(),
  ],
  base: "/projects/audojo/",
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: "./tests/setup.ts",
    coverage: {
      include: ["src/**/*"],
      exclude: ["**/index.ts"],
    },
  },
  server: {
    proxy: {
      "/api": {
        target: "http://localhost:5001/projects/audojo",
        changeOrigin: true,
      },
    },
  },
});
