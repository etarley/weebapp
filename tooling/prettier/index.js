module.exports = {
  bracketSpacing: true,
  bracketSameLine: true,
  singleQuote: false,
  jsxSingleQuote: false,
  trailingComma: "es5",
  semi: true,
  printWidth: 110,
  arrowParens: "always",
  endOfLine: "auto",
  importOrder: [
    // Mocks must be at the top as they contain vi.mock calls
    "(.*)/__mocks__/(.*)",
    "<THIRD_PARTY_MODULES>",
    "^@(calcom|ee)/(.*)$",
    "^@lib/(.*)$",
    "^@components/(.*)$",
    "^@(server|trpc)/(.*)$",
    "^~/(.*)$",
    "^[./]",
  ],
  importOrderSeparation: true,
  plugins: [
    //    "prettier-plugin-tailwindcss": "^0.5.11",
    // "@ianvs/prettier-plugin-sort-imports": "^4.1.1",
    // "@trivago/prettier-plugin-sort-imports": "^4.3.1",
    // "prettier-plugin-packagejson": "2.4.12",

    "@trivago/prettier-plugin-sort-imports",
    "prettier-plugin-packagejson",
    "prettier-plugin-tailwindcss",
  ],
};
