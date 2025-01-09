import type { UserConfig } from "vite";

import tsconfigPaths from "vite-tsconfig-paths";
import svgr from "vite-plugin-svgr";

export default {
	root: "src",
	plugins: [
		tsconfigPaths(),
		svgr({
			include: [/\.svg$/],
		}),
	],
} satisfies UserConfig;
