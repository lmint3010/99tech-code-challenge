import useSWR from "swr";

import { SWR_CACHE_KEYS } from "@/model/constants/swr-keys";
import { fetchCoinList } from "@/api/fetch-coin-list";

export const useCoinList = ({ skip }: { skip: boolean }) => {
  const { data, isLoading } = useSWR(
    skip ? null : SWR_CACHE_KEYS.COIN_LIST,
    fetchCoinList
  );

  return { coinList: data, isLoading };
};
