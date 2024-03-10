/** @type {import("eslint").Linter.Config} */
module.exports = {
  root: true,
  extends: ["@weebapp/eslint-config/native.js"],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    project: true,
  },
};
