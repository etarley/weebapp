// @ts-expect-error - no types
import baseConfig from "@weebapp/tailwind-config/native";
import nativewind from "nativewind/preset";

export default {
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  presets: [baseConfig, nativewind],
  important: true,
};
