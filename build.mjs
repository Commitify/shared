import { $ } from "bun";

// Delete existing build
await $`rm -Rf ./dist`
console.log("🗑️ Removed Artifacts");

// Global
await $`bunx tsc`
console.log("✅ Global Builded");
