import js from "@eslint/js";
import pluginQuery from "@tanstack/eslint-plugin-query";
import vitest from "@vitest/eslint-plugin";
import prettierConfig from "eslint-config-prettier";
import importPlugin from "eslint-plugin-import";
import jestDom from "eslint-plugin-jest-dom";
import react from "eslint-plugin-react";
import reactCompiler from "eslint-plugin-react-compiler";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";
import testingLibrary from "eslint-plugin-testing-library";
import globals from "globals";
import tseslint from "typescript-eslint";

/**
 * Frontend eslint configuration.
 *
 * View config with `npx @eslint/config-inspector`
 */
export default tseslint.config([
  {
    ignores: ["dist"],
    settings: { react: { version: "detect" } },
    extends: [
      js.configs.recommended,
      ...tseslint.configs.strict, // Enable type-aware linting. If too strong, pick recommended-type-checked
      ...tseslint.configs.stylisticTypeChecked, // Enforce stylistic preferences
    ],
    files: ["**/*.{ts,tsx}"],
    languageOptions: {
      ecmaVersion: "latest",
      globals: globals.browser,

      // Enabel type-aware linting
      parserOptions: {
        project: ["./tsconfig.node.json", "./tsconfig.app.json"],
        tsconfigRootDir: import.meta.dirname,
      },
    },
    plugins: {
      react,
      "react-hooks": reactHooks,
      "react-refresh": reactRefresh,
      "react-compiler": reactCompiler,
      import: importPlugin,
      "@tanstack/query": pluginQuery,
    },
    rules: {
      ...react.configs.recommended.rules,
      ...react.configs["jsx-runtime"].rules,
      ...reactHooks.configs.recommended.rules,
      ...reactCompiler.configs.recommended.rules,
      ...pluginQuery.configs["flat/recommended"][0].rules, // Integrate TanStack Query rules
      ...prettierConfig.rules, // Disables ESLint rules that conflict with Prettier

      "@typescript-eslint/no-unused-vars": ["warn", { argsIgnorePattern: "^_", varsIgnorePattern: "^_" }],
      "import/no-restricted-paths": [
        "error",
        {
          zones: [
            // disables cross-feature imports:
            // eg. src/features/sortSensei should not import from src/features/homepage, etc.
            { target: "./src/features/homepage", from: "./src/features", except: ["./homepage"] },
            { target: "./src/features/sortSensei", from: "./src/features", except: ["./sortSensei"] },
            { target: "./src/features/treeTutor", from: "./src/features", except: ["./treeTutor"] },
            { target: "./src/features/tutorial", from: "./src/features", except: ["./tutorial"] },

            // enforce unidirectional codebase:
            // e.g. src/pages can import from src/features but not the other way around
            { target: "./src/features", from: "./src/pages" },

            // e.g src/features and src/pages can import from these shared modules but not the other way around
            {
              target: ["./src/components", "./src/hooks", "./src/config", "./src/contexts", "./src/lib"],
              from: ["./src/app", "./src/features", "./src/pages"],
            },
          ],
        },
      ],

      // Disable specific rules
      "react/no-unescaped-entities": "off", // This rule disallows "" etc. in HTML
      "@typescript-eslint/dot-notation": "off", // This rule disallows styles["container"] instead of styles.container
    },
  },
  {
    files: ["tests/**/*.{ts,tsx}", "**/*.test.{ts,tsx}"],
    extends: [vitest.configs.recommended, testingLibrary.configs["flat/react"], jestDom.configs["flat/recommended"]],
    plugins: {
      testingLibrary: testingLibrary,
      vitest,
      jestDom,
    },
    rules: {
      "vitest/consistent-test-it": ["error", { fn: "it", withinDescribe: "it" }],
    },
  },
]);
