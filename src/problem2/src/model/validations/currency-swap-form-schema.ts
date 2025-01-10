import { z } from "zod";
import { ERROR_MESSAGES } from "@/model/constants/messages";
import { formatNumber } from "@/lib/utils/format";

export type CurrencySwapFormFields = z.infer<
	ReturnType<typeof getCurrencySwapFormSchema>
>;

export const getCurrencySwapFormSchema = ({ maxAmount = Number.MAX_VALUE }) =>
	z.object({
		originAmount: z
			.number({ message: ERROR_MESSAGES.INVALID_NUMBER })
			.positive({ message: ERROR_MESSAGES.POSITIVE_NUMBER })
			.max(maxAmount, {
				message: ERROR_MESSAGES.MAX_NUMBER.replace(
					"{{number}}",
					formatNumber(maxAmount),
				),
			}),
		destinationAmount: z
			.number({ message: ERROR_MESSAGES.INVALID_NUMBER })
			.positive({ message: ERROR_MESSAGES.POSITIVE_NUMBER }),
		originCoinId: z
			.string()
			.nonempty({ message: ERROR_MESSAGES.REQUIRE_CURRENCY }),
		destinationCoinId: z
			.string()
			.nonempty({ message: ERROR_MESSAGES.REQUIRE_CURRENCY }),
	});
