import type { SWRConfiguration } from "swr";

import useSWR from "swr";

import { SWR_CACHE_KEYS } from "@/model/constants/swr-keys";
import { fetchCoinList } from "@/api/fetch-coin-list";

export const useCoinList = (swrConfigs: SWRConfiguration = {}) => {
	const { data, isLoading } = useSWR(SWR_CACHE_KEYS.COIN_LIST, fetchCoinList, {
		revalidateIfStale: false,
		revalidateOnFocus: false,
		...swrConfigs,
	});

	return { coinList: data ?? [], isLoading };
};
