import js from "@eslint/js";
import prettierConfig from "eslint-config-prettier";
import importPlugin from "eslint-plugin-import";
import prettierPlugin from "eslint-plugin-prettier";
import react from "eslint-plugin-react";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";
import globals from "globals";
import tseslint from "typescript-eslint";

export default tseslint.config({
  ignores: ["dist"],
  settings: { react: { version: "detect" } },
  extends: [
    js.configs.recommended,
    ...tseslint.configs.recommendedTypeChecked, // Enable type-aware linting
    ...tseslint.configs.stylisticTypeChecked, // Enforce stylistic preferences
  ],
  files: ["**/*.{ts,tsx}"],
  languageOptions: {
    ecmaVersion: 2020,
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
    import: importPlugin,
    prettier: prettierPlugin,
  },
  rules: {
    ...react.configs.recommended.rules,
    ...react.configs["jsx-runtime"].rules,
    ...reactHooks.configs.recommended.rules,
    ...prettierConfig.rules, // Disables ESLint rules that conflict with Prettier
    "prettier/prettier": "error",
    "react-refresh/only-export-components": ["warn", { allowConstantExport: true }],
    "import/no-restricted-paths": [
      "error",
      {
        zones: [
          // disables cross-feature imports:
          // eg. src/features/sortSensei should not import from src/features/homepage, etc.
          {
            target: "./src/features/homepage",
            from: "./src/features",
            except: ["./homepage"],
          },
          {
            target: "./src/features/sortSensei",
            from: "./src/features",
            except: ["./sortSensei"],
          },
          {
            target: "./src/features/treeTutor",
            from: "./src/features",
            except: ["./treeTutor"],
          },
          {
            target: "./src/features/tutorial",
            from: "./src/features",
            except: ["./tutorial"],
          },

          // enforce unidirectional codebase:
          // e.g. src/pages can import from src/features but not the other way around
          {
            target: "./src/features",
            from: "./src/pages",
          },

          // e.g src/features and src/pages can import from these shared modules but not the other way around
          {
            target: ["./src/components", "./src/hooks", "./src/constants", "./src/contexts"],
            from: ["./src/features", "./src/pages"],
          },
        ],
      },
    ],

    // Disable specific rules
    "react/no-unescaped-entities": "off",
    "@typescript-eslint/dot-notation": "off",
  },
});
