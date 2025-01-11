import { useContext, useMemo, type FC } from 'react';
import type { Coin } from '@/model/types/data';

import { CURRENCY_SELECT_CONFIG } from '@/model/constants/ui-configs';
import { CurrencyOptionsSkeleton } from '@/components/currency-select/currency-options-skeleton';
import { CurrencyOptions } from '@/components/currency-select/currency-options';
import { filterCoinList } from '@/lib/utils/filter-coin-list';
import { CurrencySelectContext } from '@/components/currency-select/context';
import { cn } from '@/lib/utils/cn';

export type CurrencySearchListProps = {
  coins: Coin[];
  searchText: string;
  isLoading?: boolean;
  isError?: boolean;
  className?: string;
  onSearchTextChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

const { OPTION_HEIGHT, VISIBLE_OPTIONS } = CURRENCY_SELECT_CONFIG;

export const CurrencySearchList: FC<CurrencySearchListProps> = ({
  coins,
  isLoading,
  isError,
  searchText,
  className,
  onSearchTextChange,
}) => {
  const { omitCoinIds = [] } = useContext(CurrencySelectContext);

  const filteredCoinList = useMemo(
    () => filterCoinList(coins, searchText, omitCoinIds),
    [searchText, coins, omitCoinIds]
  );

  const totalCoins = coins.length;

  return (
    <div className={cn(className)}>
      <input
        type="text"
        placeholder={totalCoins > 0 ? `Type to search in ${totalCoins} results` : 'No currencies available'}
        className="w-full h-10 border border-gray-300 rounded-md px-3 shrink-0"
        onChange={onSearchTextChange}
      />
      <div
        className="pt-2 grow no-scrollbar overflow-y-auto"
        style={{ height: OPTION_HEIGHT * VISIBLE_OPTIONS }}
      >
        {isLoading && <CurrencyOptionsSkeleton fakeItems={VISIBLE_OPTIONS} />}
        {isError && (
          <div className="text-red-700 text-sm text-center p-4">
            Too much request! Try later
          </div>
        )}
        <CurrencyOptions coins={filteredCoinList} />
      </div>
    </div>
  );
};
