import type { CurrencySwapFormFields } from "@/model/validations/currency-swap-form-schema";

import { swapCurrency } from "@/api/swap-currency";
import { SWR_CACHE_KEYS } from "@/model/constants/swr-keys";
import useSWRMutation from "swr/mutation";

export const useCurrencySwapper = () => {
	const utils = useSWRMutation(
		SWR_CACHE_KEYS.SWAP_CURRENCY,
		(_, { arg }: { arg: CurrencySwapFormFields }) => swapCurrency(arg),
	);

	return utils;
};
