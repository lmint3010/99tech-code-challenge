import type { FC } from "react";

export type CurrencySwapFormProps = object;

export const CurrencySwapForm: FC<CurrencySwapFormProps> = () => {
	return (
		<form>
			<h5>Swap</h5>
			<label htmlFor="input-amount">Amount to send</label>
			<input id="input-amount" />

			<label htmlFor="output-amount">Amount to receive</label>
			<input id="output-amount" />

			<button type="button">CONFIRM SWAP</button>
		</form>
	);
};
