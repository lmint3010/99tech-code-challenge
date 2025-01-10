import type { CurrencySwapFormFields } from "@/model/validations/currency-swap-form-schema";

const DELAY_RESPONSE_TIME = 2000;

export async function swapCurrency(data: CurrencySwapFormFields) {
	// This function is mocking api call to swap currency at the moment
	// In the future, this function will be implemented to call the real api

	return new Promise((resolve) => {
		setTimeout(() => {
			resolve("Currency swapped successfully");
		}, DELAY_RESPONSE_TIME);
	});
}
