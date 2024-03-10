// This configuration only applies to the package manager root.
/** @type {import("eslint").Linter.Config} */
module.exports = {
	extends: ["@weebapp/eslint-config/next.js"],
	parser: "@typescript-eslint/parser",
	parserOptions: {
		project: true,
	},
	ignorePatterns: ["apps/**", "packages/**", "tooling/**"],
};
