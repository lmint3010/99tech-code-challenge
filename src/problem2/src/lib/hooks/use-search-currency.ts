import { useMemo, useState } from "react";
import debounce from "lodash.debounce";

export const useSearchCurrency = () => {
	const [searchText, setSearchText] = useState("");

	const debouncedSetSearch = useMemo(
		() =>
			debounce(
				(event: React.ChangeEvent<HTMLInputElement>) =>
					setSearchText(event.target.value),
				CURRENCY_SELECT_CONFIG.SEARCH_DEBOUNCE_MS,
			),
		[],
	);

	const clearSearchText = () => setSearchText("");

	return {
		searchText,
		setSearchText: debouncedSetSearch,
		clearSearchText,
	};
};
