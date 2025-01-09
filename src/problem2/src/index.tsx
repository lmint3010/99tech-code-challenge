import { createRoot } from "react-dom/client";

import { HomePage } from "@/pages/home";

const container = document.getElementById("react-app");

if (!container) {
	throw new Error("Container not found");
}

const root = createRoot(container);

root.render(<HomePage />);
