interface WalletBalance {
  currency: string;
  amount: number;
  blockchain: string;
}

interface FormattedWalletBalance extends WalletBalance {
  formatted: string;
}

// Could move to a separate file - but for the sake of simplicity, I'll keep it here
interface Price {
  [currency: string]: number | undefined;
}

// Could move to a separate file - but for the sake of simplicity, I'll keep it here
enum BLOCKCHAIN_PRIORITY {
  Osmosis = 100,
  Ethereum = 50,
  Arbitrum = 30,
  Zilliqa = 20,
  Neo = 20,
}

// Could move to a separate file - but for the sake of simplicity, I'll keep it here
const BLOCKCHAIN_PRIORITY_FALLBACK = -99;

const WalletPage: React.FC<BoxProps> = (props) => {
  const { children, ...rest } = props;

  const balances: WalletBalance[] = useWalletBalances();
  const prices: Price[] = usePrices();

  const getPriority = (blockchain: WalletBalance['blockchain']): number => {
    if (blockchain in BLOCKCHAIN_PRIORITY) {
      return BLOCKCHAIN_PRIORITY[blockchain];
    }

    return BLOCKCHAIN_PRIORITY_FALLBACK;
  };

  const sortedBalances: WalletBalance[] = useMemo(() => {
    return balances.filter((balance) => {
      const hasBalance = balance.amount > 0;

      if (!hasBalance) return false;

      const hasValidPriority = getPriority(balance.blockchain) !== BLOCKCHAIN_PRIORITY_FALLBACK;

      return hasValidPriority;
    }).sort((lhs, rhs) => {
      const leftPriority = getPriority(lhs.blockchain);
      const rightPriority = getPriority(rhs.blockchain);

      return rightPriority - leftPriority;
    });
  }, [balances]);

  const formattedBalances = sortedBalances.map(
    (balance): FormattedWalletBalance => {
      return {
        ...balance,
        formatted: balance.amount.toFixed()
      };
    }
  );

  const rows = formattedBalances.map((balance): JSX.Element => {
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
    <div {...rest}>
      {rows}
    </div>
  );
}
