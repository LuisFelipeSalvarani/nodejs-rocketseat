import swc from "unplugin-swc"
import { defineConfig } from "vitest/config"

export default defineConfig({
  resolve: {
    tsconfigPaths: true,
  },
  test: {
    include: ["**/*.e2e-spec.ts"],
    globals: true,
    root: "./",
    setupFiles: ["./test/setup-e2e.ts"],
    testTimeout: 1000 * 20,
  },
  plugins: [
    swc.vite({
      module: { type: "es6" },
    }),
  ],
})
