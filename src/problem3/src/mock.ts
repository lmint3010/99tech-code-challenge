// This file is for mocking things to make things work without errors
import type { Price, WalletBalance } from "./types";

export function useWalletBalances(): WalletBalance[] {
	return [];
}

export function usePrices(): Price {
	return {};
}

export const classes = { row: "" };

export const WalletRow = (props: Record<string, unknown>) => null;
