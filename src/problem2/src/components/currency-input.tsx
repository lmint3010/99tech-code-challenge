import { useState, type FC } from "react";

import { formatNumber } from "@/utils/format";

export type CurrencyInputProps = {
	id?: string;
	onChange?: (value: number) => void;
};

const INVALID_MASK_VALUE_CHARS = /[^0-9\.\,]/g;
const NON_NUMERIC_REGEX = /[^0-9\.]/g;

export const CurrencyInput: FC<CurrencyInputProps> = ({ id, onChange }) => {
	const [maskValue, setMaskValue] = useState("");

	const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const inputValue = event.target.value;

		const maskedValue = inputValue.replace(INVALID_MASK_VALUE_CHARS, "");
		setMaskValue(maskedValue);

		const numericValue = Number(maskedValue.replace(NON_NUMERIC_REGEX, ""));
		onChange?.(numericValue);
	};

	const handleInputBlur = (event: React.ChangeEvent<HTMLInputElement>) => {
		const inputValue = event.target.value;

		if (!inputValue) {
			return;
		}

		const numericValue = Number(inputValue.replace(NON_NUMERIC_REGEX, ""));

		const formattedValue = formatNumber(numericValue);
		setMaskValue(formattedValue);
	};

	return (
		<input
			id={id}
			inputMode="decimal"
			autoComplete="off"
			value={maskValue}
			onChange={handleInputChange}
			onBlur={handleInputBlur}
			className="appearance-none bg-transparent w-full text-3xl text-gray-800 outline-none"
			placeholder="0"
		/>
	);
};
