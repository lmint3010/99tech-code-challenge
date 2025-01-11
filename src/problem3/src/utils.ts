import type { FormattedWalletBalance, WalletBalance } from "./types";

import { BLOCKCHAIN_PRIORITY_FALLBACK, BLOCKCHAIN_PRIORITY } from "./constants";

export const getBlockchainPriority = (
	blockchain: WalletBalance["blockchain"],
): number => {
	if (blockchain in BLOCKCHAIN_PRIORITY) {
		return BLOCKCHAIN_PRIORITY[blockchain];
	}

	return BLOCKCHAIN_PRIORITY_FALLBACK;
};

export function isValidBalance(balance: WalletBalance): boolean {
	const hasBalance = balance.amount > 0;

	if (!hasBalance) return false;

	const hasValidPriority =
		getBlockchainPriority(balance.blockchain) !== BLOCKCHAIN_PRIORITY_FALLBACK;

	return hasValidPriority;
}

export function sortByBlockchainPriority(
	leftBalance: WalletBalance,
	rightBalance: WalletBalance,
): number {
	const leftPriority = getBlockchainPriority(leftBalance.blockchain);
	const rightPriority = getBlockchainPriority(rightBalance.blockchain);

	return rightPriority - leftPriority;
}

export function formatBalances(
	balances: WalletBalance[],
): FormattedWalletBalance[] {
	return balances.map((balance) => {
		return {
			...balance,
			formatted: balance.amount.toFixed(),
		};
	});
}
