import type { UserConfig } from "vite";

import tsconfigPaths from "vite-tsconfig-paths";
import svgr from "vite-plugin-svgr";

export default {
	root: "src",
	build: {
		outDir: "../dist",
	},
	plugins: [
		tsconfigPaths(),
		svgr({
			include: [/\.svg$/],
		}),
	],
} satisfies UserConfig;
