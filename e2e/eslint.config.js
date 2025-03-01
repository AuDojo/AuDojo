import typescript from "@typescript-eslint/eslint-plugin";
import typescriptParser from "@typescript-eslint/parser";
import playwright from "eslint-plugin-playwright";
import tseslint from "typescript-eslint";

const { configs: typescriptConfigs } = typescript;

/**
 * e2e eslint configuration.
 *
 * View config with `npx @eslint/config-inspector`
 */
export default tseslint.config([
  {
    files: ["tests/**/*.ts", "tests/**/*.tsx"],
    plugins: {
      "@typescript-eslint": typescript,
      playwright: playwright,
    },
    languageOptions: {
      parser: typescriptParser,
      parserOptions: {
        ecmaVersion: "latest",
        sourceType: "module",
      },
    },
    rules: {
      ...typescriptConfigs["recommended"].rules,
      ...playwright.configs["flat/recommended"].rules,

      "no-console": "warn",
      "@typescript-eslint/no-floating-promises": "error",
    },
  },
]);
