import dts from "bun-plugin-dts";
import { $ } from "bun";

const BASE_CONFIG = {
  target: "node",
  splitting: true,
  plugins: [dts()],
};

// Delete existing build
await $`rm -Rf ./dist`
console.log("🗑️ Removed Artifacts");

// Global
await Bun.build({
  ...BASE_CONFIG,
  entrypoints: ["./src/index.ts"],
  outdir: "./dist",
});
console.log("✅ Global Builded");

// Tree shaked
await Bun.build({
  ...BASE_CONFIG,
  entrypoints: ["./src/types/index.ts"],
  outdir: "./dist/types",
});
await Bun.build({
  ...BASE_CONFIG,
  entrypoints: ["./src/validation/index.ts"],
  outdir: "./dist/validation",
});
await Bun.build({
  ...BASE_CONFIG,
  entrypoints: ["./src/utils/index.ts"],
  outdir: "./dist/utils",
});
console.log("✅ Tree shaked Builded");
