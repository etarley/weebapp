import type { Config } from "tailwindcss";

import base from "./base";

export default {
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  presets: [base],
  theme: {},
} satisfies Config;
