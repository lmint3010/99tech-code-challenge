import type { FC } from "react";

import useSWR from "swr";

import { GLOBAL_SWR_KEYS } from "@/constants/swr-keys";
import { CurrencySwapForm } from "@/components/currency-swap-form";
import { fetchCoinList } from "@/api/fetch-coin-list";

export const HomePage: FC = () => {
	useSWR(GLOBAL_SWR_KEYS.COIN_LIST, fetchCoinList);

	return (
		<div className="w-screen h-screen grid place-items-center bg-primary-background">
			<div className="flex flex-col items-center">
				<div className="px-12 py-1 inline-block font-medium tracking-wider uppercase text-indigo-700 text-sm mb-4">
					Seamless currency exchange
				</div>
				<h1 className="text-4xl leading-tight font-medium text-center mb-12">
					<span className="text-gray-700">Swap whenever and wherever</span>
					<br />
					<span className="bg-gradient-to-r from-indigo-600 to-primary-foreground bg-clip-text text-transparent">
						works best for you
					</span>
				</h1>
				<CurrencySwapForm availableAmount={1_000_000} />
			</div>
		</div>
	);
};
