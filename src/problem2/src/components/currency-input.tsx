import { useEffect, useState, type FC } from "react";

import { formatNumber } from "@/utils/format";
import { cn } from "@/utils/cn";

const INVALID_MASK_VALUE_CHARS = /[^0-9.,]/g;
const NON_NUMERIC_REGEX = /[^0-9.]/g;
const NUMBER_SEPARATOR_REGEX = /[.,]/g;

export type CurrencyInputProps = {
	id?: string;
	readonly?: boolean;
	value?: number;
	onChange?: (value: number) => void;
};

export const CurrencyInput: FC<CurrencyInputProps> = ({
	id,
	readonly,
	value,
	onChange,
}) => {
	const [maskValue, setMaskValue] = useState(value ? formatNumber(value) : "");

	useEffect(() => {
		if (value === undefined) {
			return;
		}

		const updateMaskValue = () => {
			const formattedValue = formatNumber(value);
			const hasSeparatorInMask = NUMBER_SEPARATOR_REGEX.test(maskValue);

			setMaskValue(
				hasSeparatorInMask
					? formattedValue
					: formattedValue.replace(NUMBER_SEPARATOR_REGEX, ""),
			);
		};

		updateMaskValue();

		return () => setMaskValue("");
	}, [value]);

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
			className={cn(
				"appearance-none bg-transparent w-full",
				"text-3xl font-semibold text-gray-800",
				"outline-none placeholder:text-gray-300",
				"tracking-wider",
			)}
			placeholder="Enter amount"
			readOnly={readonly}
		/>
	);
};
