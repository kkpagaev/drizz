import { defineConfig } from "tsup"

export default defineConfig((options) => ({
  entry: ["src/**/*.ts"],
  sourcemap: true,
  clean: true,
  onSuccess: options.watch
    ? "NODE_ENV=dev node --enable-source-maps -r tsconfig-paths/register dist/index.js | npx pino-pretty"
    : undefined,
  watch: options.watch ? "./src/*" : undefined,
  bundle: true,
  platform: "node",
  target: "node18"
}))
