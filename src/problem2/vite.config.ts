import type { UserConfig } from "vite";

import tsconfigPaths from "vite-tsconfig-paths";

export default {
	root: "src",
	plugins: [tsconfigPaths()],
} satisfies UserConfig;
