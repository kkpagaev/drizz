//eslint-ignore
import * as path from "path"
import { defineConfig } from "vitest/config"

export default defineConfig({
  test: {
    environment: "node",
    include: ["src/**/*.spec.ts", "__tests__/e2e/**/*.spec.ts"],
    hookTimeout: 1000000000,
    alias: {
      "fastify-build": "src/fastify.ts",
      "@": path.resolve(__dirname, "./src")
    },
    typecheck: {
      tsconfig: "tsconfig.test.json"
    }
  }
})
