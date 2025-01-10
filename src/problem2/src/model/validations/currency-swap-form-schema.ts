import { z } from "zod";

import { formatNumber } from "@/lib/utils/format";

export type CurrencySwapFormFields = z.infer<
	ReturnType<typeof getCurrencySwapFormSchema>
>;

export const getCurrencySwapFormSchema = ({ maxAmount = Number.MAX_VALUE }) =>
	z.object({
		originAmount: z
			.number({ message: "Please enter a valid number" })
			.positive({ message: "Please enter a positive value" })
			.max(maxAmount, {
				message: `Please enter a value less than ${formatNumber(maxAmount)}`,
			}),
		originCoinId: z.string().nonempty({ message: "Please select currency" }),
		destinationCoinId: z.string().nonempty({ message: "Please select currency" }),
	});
