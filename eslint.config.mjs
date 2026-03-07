import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";
import prettier from "eslint-config-prettier";
import perfectionist from "eslint-plugin-perfectionist";
import unusedImports from "eslint-plugin-unused-imports";
import { defineConfig, globalIgnores } from "eslint/config";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  prettier,
  {
    plugins: {
      perfectionist,
      "unused-imports": unusedImports,
    },
    rules: {
      "@typescript-eslint/no-unused-vars": "off",
      "no-unused-vars": "off",
      "unused-imports/no-unused-imports": "error",
      "unused-imports/no-unused-vars": [
        "warn",
        {
          args: "after-used",
          argsIgnorePattern: "^_",
          vars: "all",
          varsIgnorePattern: "^_",
        },
      ],

      // Perfectionist: Object sorting
      "perfectionist/sort-objects": [
        "error",
        {
          groups: ["unknown", "multiline-property"],
          partitionByComment: true,
          type: "alphabetical",
        },
      ],

      // Perfectionist: JSX Props sorting (least to longest line, multiline last)
      "react/jsx-sort-props": "off",
      "perfectionist/sort-jsx-props": [
        "error",
        {
          order: "asc",
          type: "line-length",
        },
      ],

      // Perfectionist: Exports
      "perfectionist/sort-exports": [
        "error",
        {
          type: "alphabetical",
        },
      ],

      // Perfectionist: Named Exports
      "perfectionist/sort-named-exports": [
        "error",
        {
          type: "alphabetical",
        },
      ],

      // Perfectionist: Variable Declarations (if available, otherwise fallback/ignore)
      "perfectionist/sort-variable-declarations": [
        "error",
        {
          type: "alphabetical",
        },
      ],
    },
  },
  // Override default ignores of eslint-config-next.
  globalIgnores([
    // Default ignores of eslint-config-next:
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
  ]),
]);

export default eslintConfig;
