import { createRoot } from "react-dom/client";
import { NuqsAdapter } from 'nuqs/adapters/react';
import { HomePage } from "@/pages/home";

const container = document.getElementById("react-app");

if (!container) {
	throw new Error("Container not found");
}

const root = createRoot(container);

root.render(
	<NuqsAdapter>
		<HomePage />
	</NuqsAdapter>
);
