import type { WalletBalance, BoxProps } from './types';

import { useMemo } from 'react';

import { useWalletBalances } from './mock';
import { isValidBalance, sortByBlockchainPriority } from './utils';
import { BalanceRows } from './balance-rows';

export const WalletPage: React.FC<BoxProps> = ({ children, ...remainingProps }) => {
  const balances = useWalletBalances();

  const sortedBalances: WalletBalance[] = useMemo(() => {
    return balances
      .filter(isValidBalance)
      .sort(sortByBlockchainPriority);
  }, [balances]);

  return (
    <div {...remainingProps}>
      <BalanceRows balances={sortedBalances} />
    </div>
  );
}
