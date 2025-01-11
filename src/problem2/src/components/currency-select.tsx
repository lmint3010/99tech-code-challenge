import { useMemo, useState, type FC } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { ChevronDown } from 'lucide-react';
import debounce from 'lodash.debounce';

import { CurrencyOptions, type CurrencyOptionsProps } from '@/components/currency-options';
import { CurrencyOptionsSkeleton } from '@/components/currency-options-skeleton';
import { useCoinList } from '@/lib/hooks/use-coin-list';
import { useCurrencySelectFloating } from '@/lib/hooks/use-currency-select-floating';

const VISIBLE_OPTIONS = 5.5;
const OPTION_HEIGHT = 48;
const LIST_HEIGHT = VISIBLE_OPTIONS * OPTION_HEIGHT;

const SEARCH_TEXT_DEBOUCE_TIME_IN_MS = 300;

export type CurrencySelectProps = Omit<CurrencyOptionsProps, 'coins'>;

export const CurrencySelect: FC<CurrencySelectProps> = ({ value, onChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchText, setSearchText] = useState('');

  const {
    refs,
    floatingStyles,
    getReferenceProps,
    getFloatingProps
  } = useCurrencySelectFloating({
    open: isOpen,
    onOpenChange(open) {
      if (!open) setSearchText('');

      setIsOpen(open);
    }
  });

  const { coinList, isLoading, error } = useCoinList();

  const filteredCoinList = useMemo(() => {
    if (!searchText) return coinList;

    const lowerSearch = searchText.toLowerCase();

    const matchCoins = coinList.filter(
      ({ name, symbol }) => {
        const lowerName = name.toLowerCase();
        const lowerSymbol = symbol.toLowerCase();

        return lowerName.includes(lowerSearch) || lowerSymbol.includes(lowerSearch);
      }
    );

    return matchCoins;
  }, [searchText, coinList]);

  const handleChangeSearchText = debounce(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setSearchText(event.target.value);
    },
    SEARCH_TEXT_DEBOUCE_TIME_IN_MS
  );

  const handleChangeSelection = (id: string) => {
    setIsOpen(false);
    setSearchText('');
    onChange?.(id);
  };

  const totalCoins = coinList.length;
  const selectedCoin = coinList.find(({ uuid }) => uuid === value);

  return (
    <>
      <button
        type="button"
        ref={refs.setReference}
        className="flex items-center gap-2 bg-white/60 rounded-full py-1 px-1.5 w-28 absolute top-3 right-3"
        {...getReferenceProps()}
      >
        <div className="size-6 bg-gray-100 grid place-items-center rounded-full shrink-0">
          {selectedCoin && (
            <img
              alt={selectedCoin.name}
              src={selectedCoin.iconUrl}
              className="size-5"
            />
          )}
        </div>
        {selectedCoin
          ? <span className="truncate text-xs grow">{selectedCoin.symbol}</span>
          : <span className="text-gray-400 text-xs grow">Select</span>
        }
        <ChevronDown size={16} className="shrink-0" />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            ref={refs.setFloating}
            style={floatingStyles}
            className="bg-white rounded-xl p-3 w-72 flex flex-col z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            {...getFloatingProps()}
          >
            <input
              type="text"
              placeholder={totalCoins > 0 ? `Discover ${totalCoins} results` : 'No currencies available'}
              className="w-full h-10 border border-gray-300 rounded-md px-3 shrink-0"
              onChange={handleChangeSearchText}
            />
            <div className="mt-2 grow no-scrollbar overflow-y-auto" style={{ height: LIST_HEIGHT }}>
              {isLoading && <CurrencyOptionsSkeleton fakeItems={VISIBLE_OPTIONS} />}
              {error && (
                <div className="text-red-700 text-sm text-center p-4">
                  Too much request! Try later
                </div>
              )}
              <CurrencyOptions
                coins={filteredCoinList}
                value={value}
                onChange={handleChangeSelection}
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
