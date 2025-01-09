import type { Coin } from "@/types/data";

export async function fetchCoinList() {
	const response = await fetch("https://api.coinranking.com/v2/coins?limit=100");

	if (!response.ok) {
		throw new Error("Failed to fetch coin list");
	}

	const json = await response.json();

	return json.data.coins as Coin[];
}
