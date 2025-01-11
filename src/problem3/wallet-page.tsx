interface WalletBalance {
  currency: string;
  amount: number;
  blockchain: string;
}

interface FormattedWalletBalance extends WalletBalance {
  formatted: string;
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

  const balances = useWalletBalances();
  const prices = usePrices();

  const getPriority = (blockchain: WalletBalance['blockchain']): number => {
    if (blockchain in BLOCKCHAIN_PRIORITY) {
      return BLOCKCHAIN_PRIORITY[blockchain];
    }

    return BLOCKCHAIN_PRIORITY_FALLBACK;
  };

  const sortedBalances = useMemo(() => {
    return balances.filter((balance: WalletBalance) => {
      const balancePriority = getPriority(balance.blockchain);

      if (lhsPriority > -99) {
        if (balance.amount <= 0) {
          return true;
        }
      }

      return false;
    }).sort((lhs: WalletBalance, rhs: WalletBalance) => {
      const leftPriority = getPriority(lhs.blockchain);
      const rightPriority = getPriority(rhs.blockchain);

      if (leftPriority > rightPriority) {
        return -1;
      } else if (rightPriority > leftPriority) {
        return 1;
      }
    });
  }, [balances, prices]);

  const formattedBalances = sortedBalances.map((balance: WalletBalance) => {
    return {
      ...balance,
      formatted: balance.amount.toFixed()
    };
  });

  const rows = sortedBalances.map((balance: FormattedWalletBalance, index: number) => {
    const usdValue = prices[balance.currency] * balance.amount;

    return (
      <WalletRow
        className={classes.row}
        key={index}
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
