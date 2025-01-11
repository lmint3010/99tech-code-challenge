import { useEffect, useState, type FC } from "react";

import { formatNumber } from "@/lib/utils/format";
import { cn } from "@/lib/utils/cn";

const INVALID_MASK_VALUE_CHARS = /[^0-9.,]/g;
const NON_NUMERIC_REGEX = /[^0-9.]/g;
const NUMBER_SEPARATOR_REGEX = /[.,]/g;

export type CurrencyInputProps = {
	id?: string;
	readonly?: boolean;
	placeholder?: string;
	value?: number | null;
	onChange?: (value: number | null) => void;
};

export const CurrencyInput: FC<CurrencyInputProps> = ({
	id,
	readonly,
	placeholder,
	value,
	onChange,
}) => {
	const [maskValue, setMaskValue] = useState(value ? formatNumber(value) : "");

	useEffect(() => {
		if (value === undefined || value === null) {
			return;
		}

		const updateMaskValue = () => {
			const formattedValue = formatNumber(value);
			const hasSeparatorInMask = NUMBER_SEPARATOR_REGEX.test(maskValue);

			setMaskValue(
				hasSeparatorInMask || readonly
					? formattedValue
					: formattedValue.replace(NUMBER_SEPARATOR_REGEX, ""),
			);
		};

		updateMaskValue();

		return () => setMaskValue("");
	}, [value]);

	const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const inputValue = event.target.value;

		const cleanedValue = inputValue.replace(INVALID_MASK_VALUE_CHARS, "");

		setMaskValue(cleanedValue);

		const numericValue = Number(cleanedValue.replace(NON_NUMERIC_REGEX, ""));

		onChange?.(cleanedValue ? numericValue : null);
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
			placeholder={placeholder}
			readOnly={readonly}
		/>
	);
};
