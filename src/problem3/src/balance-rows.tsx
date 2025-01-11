import type { FC } from 'react';
import type { WalletBalance } from './types';

import { classes, usePrices, WalletRow } from './mock';
import { formatBalances } from './utils';

export interface BalanceRowsProps {
  balances: WalletBalance[];
};

export const BalanceRows: FC<BalanceRowsProps> = ({ balances }) => {
  const formattedBalances = formatBalances(balances);

  const prices = usePrices();

  return formattedBalances.map((balance) => {
    const usdValue = (prices[balance.currency] ?? 0) * balance.amount;

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
};
