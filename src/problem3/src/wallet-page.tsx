import type { WalletBalance, BoxProps } from './types';

import { useMemo } from 'react';

import { usePrices, useWalletBalances, classes, WalletRow } from './mock';
import { isValidBalance, sortByBlockchainPriority, formatBalances } from './utils';

export const WalletPage: React.FC<BoxProps> = (props) => {
  const { children, ...remainingProps } = props;

  const balances = useWalletBalances();
  const prices = usePrices();

  const sortedBalances: WalletBalance[] = useMemo(() => {
    return balances
      .filter(isValidBalance)
      .sort(sortByBlockchainPriority);
  }, [balances]);

  const formattedBalances = formatBalances(sortedBalances);

  const balanceRows = formattedBalances.map((balance): React.JSX.Element => {
    const usdValue = prices[balance.currency] * balance.amount;

    const uniqueKey = `${balance.blockchain}-${balance.currency}-${balance.amount}`;

    return (
      <WalletRow
        className={classes.row}
        key={uniqueKey}
        amount={balance.amount}
        usdValue={usdValue}
        formattedAmount={balance.formatted}
      />
    );
  });

  return (
    <div {...remainingProps}>
      {balanceRows}
    </div>
  );
}
