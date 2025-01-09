import React from "react";
import { createRoot } from "react-dom/client";

import { CurrencySwapForm } from "@/currency-swap-form";

const container = document.getElementById("react-app");

if (!container) {
  throw new Error("Container not found");
}

const root = createRoot(container);

root.render(<CurrencySwapForm />);
