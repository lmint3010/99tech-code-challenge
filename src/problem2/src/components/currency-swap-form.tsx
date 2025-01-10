import type { FC } from "react";

import { CurrencyInput } from "@/components/currency-input";
import { formatNumber } from "@/lib/utils/format";

import SwapIcon from "@/model/assets/icons/swap.svg";
import { cn } from "@/lib/utils/cn";
import { OriginFieldGroup } from "@/components/origin-field-group";
import { DestinationFieldGroup } from "@/components/destination-field-group";

export type CurrencySwapFormProps = object;

export const CurrencySwapForm: FC<CurrencySwapFormProps> = () => {
	return (
		<form className="p-8 bg-primary-backgroundLight/40 backdrop-blur rounded-3xl flex flex-col gap-3">
			<div className="flex flex-col gap-1.5 relative">
				<OriginFieldGroup />
				<div
					className={cn(
						"size-12 rounded-full bg-indigo-700 border-[6px] border-primary-background grid place-items-center",
						"absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 z-50",
					)}
				>
					<SwapIcon className="size-8/12 rotate-90 text-white" />
				</div>
				<DestinationFieldGroup />
			</div>

			<button type="button">CONFIRM SWAP</button>
		</form>
	);
};
