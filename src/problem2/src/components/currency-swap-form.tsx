import type { FC } from "react";

import { CurrencyInput } from "@/components/currency-input";
import { formatNumber } from "@/utils/format";

import SwapIcon from "@/assets/icons/swap.svg";
import { cn } from "@/utils/cn";
import { CurrencySelect } from "@/components/currency-select";

export type CurrencySwapFormProps = {
	availableAmount: number;
};

export const CurrencySwapForm: FC<CurrencySwapFormProps> = ({
	availableAmount,
}) => {
	return (
		<form className="p-8 bg-primary-backgroundLight/40 backdrop-blur rounded-3xl flex flex-col gap-3">
			<div className="flex flex-col gap-1.5 relative">
				<div className="bg-primary-backgroundLight rounded-lg py-4 px-6 flex flex-col gap-2">
					<label
						htmlFor="input-amount"
						className="text-sm font-medium text-indigo-700 cursor-pointer"
					>
						Amount
					</label>
					<CurrencyInput id="input-amount" />
					<CurrencySelect />
					<div className="flex items-end gap-1.5 text-sm">
						<span className="text-gray-600 text-xs">Available</span>
						<span className="font-semibold text-gray-800">
							{formatNumber(availableAmount)}
						</span>
					</div>
				</div>

				<div
					className={cn(
						"size-12 rounded-full bg-indigo-700 border-[6px] border-primary-background grid place-items-center",
						"absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2",
					)}
				>
					<SwapIcon className="size-8/12 rotate-90 text-white" />
				</div>

				<div className="bg-primary-backgroundLight rounded-lg py-4 px-6 flex flex-col gap-2">
					<label
						htmlFor="output-amount"
						className="text-sm font-medium text-indigo-700 cursor-pointer"
					>
						Get
					</label>
					<CurrencyInput id="output-amount" value={123_000} readonly />
					<div className="flex items-center gap-1.5 text-sm">
						<span className="text-gray-600 text-xs leading-tight">
							Estimated Fee
						</span>
						<span className="font-semibold text-gray-800">
							{formatNumber(0)}
						</span>
					</div>
				</div>
			</div>

			<button type="button">CONFIRM SWAP</button>
		</form>
	);
};
