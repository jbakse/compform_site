import globals from "globals";
import pluginJs from "@eslint/js";

/**
 * the p5js eslint config packages aren't eslint 9 flat compatible
 * use FlatCompat to adapt them
 */
import { FlatCompat } from "@eslint/eslintrc";
import path from "node:path";
import { fileURLToPath } from "node:url";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const compat = new FlatCompat({
  baseDirectory: __dirname,
});

export default [
  ...compat.extends("p5js", "p5js/sound"),
  { files: ["**/*.js"], languageOptions: { sourceType: "script" } },
  { languageOptions: { globals: globals.browser } },
  pluginJs.configs.recommended,
  {
    rules: {
      "no-var": "error",
      "prefer-const": "error",
    },
  },
];
