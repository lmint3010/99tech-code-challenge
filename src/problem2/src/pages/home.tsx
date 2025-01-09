import { CurrencySwapForm } from "@/components/currency-swap-form";
import type { FC } from "react";

export const HomePage: FC = () => {
	return (
		<div className="w-screen h-screen grid place-items-center bg-primary-background">
			<CurrencySwapForm availableAmount={1_000_000} />
		</div>
	);
};
