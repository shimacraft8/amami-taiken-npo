import nextVitals from "eslint-config-next/core-web-vitals";

const config = [
  ...nextVitals,
  { rules: { "react-hooks/set-state-in-effect": "warn" } },
  { ignores: [".next/**", ".open-next/**", ".wrangler/**", "node_modules/**", "next-env.d.ts", "deta/**"] },
];

export default config;
