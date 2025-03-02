import { FlatCompat } from "@eslint/eslintrc";
import eslintConfigCodely from "eslint-config-codely";
import { dirname } from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
	baseDirectory: __dirname,
});

// Original Next.js config
const nextConfig = compat.extends("next/core-web-vitals", "next/typescript");

const eslintConfig = [
	// Codely TypeScript config
	...eslintConfigCodely.full,

	// Add Next.js configs but filter out duplicate plugin definitions
	...nextConfig.filter((config) => {
		return !(config.plugins && config.plugins.import);
	}),

	{
		settings: {
			react: {
				version: "detect",
			},
		},
		rules: {
			"react/react-in-jsx-scope": "off",
			"@typescript-eslint/explicit-module-boundary-types": "off",
			"@typescript-eslint/no-unused-vars": "warn",
			"no-console": "off",
			"@next/next/no-img-element": "off",
		},
	},
];

export default eslintConfig;
