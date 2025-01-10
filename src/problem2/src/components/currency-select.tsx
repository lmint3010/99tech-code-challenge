import { useMemo, useState, type FC } from 'react';
import { AnimatePresence, motion } from 'motion/react';

import { ChevronDown } from 'lucide-react';
import { CurrencyOptions, type CurrencyOptionsProps } from '@/components/currency-options';
import { CurrencyOptionsSkeleton } from '@/components/currency-options-skeleton';
import { useCoinList } from '@/lib/hooks/use-coin-list';
import { useFloatingConfig } from '@/lib/hooks/use-floating-configs';

const VISIBLE_OPTIONS = 5.5;
const OPTION_HEIGHT = 48;
const LIST_HEIGHT = VISIBLE_OPTIONS * OPTION_HEIGHT;

export type CurrencySelectProps = Omit<CurrencyOptionsProps, 'coins'>;

export const CurrencySelect: FC<CurrencySelectProps> = ({ value, onChange }) => {
  const [isOpen, setIsOpen] = useState(false);

  const { coinList, isLoading } = useCoinList({ skip: !isOpen });

  const selectedCoin = useMemo(
    () => coinList?.find(
      ({ uuid }) => uuid === value
    ),
    [coinList, value]
  );

  const {
    refs,
    floatingStyles,
    getReferenceProps,
    getFloatingProps
  } = useFloatingConfig(isOpen, setIsOpen);

  const totalCoins = coinList?.length ?? 0;

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
          : <span className="text-gray-400 text-xs grow">None</span>
        }
        <ChevronDown size={16} className="shrink-0" />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            ref={refs.setFloating}
            style={floatingStyles}
            className="bg-white rounded-xl p-3 w-72 flex flex-col"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            {...getFloatingProps()}
          >
            <input
              type="text"
              placeholder={totalCoins > 0 ? `Discover ${totalCoins} results` : 'No currencies available'}
              className="w-full h-10 border border-gray-300 rounded-md px-3 shrink-0"
            />
            <div className="mt-2 grow no-scrollbar overflow-y-auto" style={{ height: LIST_HEIGHT }}>
              {isLoading && <CurrencyOptionsSkeleton fakeItems={VISIBLE_OPTIONS} />}
              <CurrencyOptions
                coins={coinList}
                value={value}
                onChange={onChange}
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
