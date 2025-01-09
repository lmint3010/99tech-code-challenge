import { CurrencySwapForm } from "@/components/currency-swap-form";
import type { FC } from "react";

export const HomePage: FC = () => {
	return (
		<div className="w-screen h-screen grid place-items-center bg-primary-background">
			<h1>Swap whenever and whereever works best for you</h1>
			<CurrencySwapForm availableAmount={1_000_000} />
		</div>
	);
};
