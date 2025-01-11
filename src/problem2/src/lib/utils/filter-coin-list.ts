import type { Coin } from "@/model/types/data";

const matchesSearchText = (coin: Coin, searchText: string): boolean => {
	if (!searchText) return true;

	const lowerSearch = searchText.toLowerCase();
	const lowerName = coin.name.toLowerCase();
	const lowerSymbol = coin.symbol.toLowerCase();

	return lowerName.includes(lowerSearch) || lowerSymbol.includes(lowerSearch);
};

const isNotOmitted = (coin: Coin, omitCoinIds: string[]): boolean => {
	return !omitCoinIds.includes(coin.uuid);
};

export const filterCoinList = (
	coinList: Coin[],
	searchText: string,
	omitCoinIds: string[],
): Coin[] => {
	return coinList.filter(
		(coin) =>
			matchesSearchText(coin, searchText) && isNotOmitted(coin, omitCoinIds),
	);
};
