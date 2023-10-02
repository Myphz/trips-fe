import resolveConfig from "tailwindcss/resolveConfig";
// @ts-ignore
import tailwindConfig from "../../../tailwind.config";

export function getTwConfig() {
  const twConfig = resolveConfig(tailwindConfig);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return twConfig as Record<string, any>;
}
