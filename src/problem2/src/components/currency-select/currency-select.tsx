import type { ComponentPropsWithoutRef, FC } from 'react';
import type { CurrencyOptionsProps } from '@/components/currency-select/currency-options';

import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';

import { useCoinList } from '@/lib/hooks/use-coin-list';
import { useCurrencySelectFloating } from '@/lib/hooks/use-currency-select-floating';
import { useSearchCurrency } from '@/lib/hooks/use-search-currency';
import { useIsMobile } from '@/lib/hooks/use-is-mobile';
import { Drawer, DrawerContent } from '@/components/drawer';
import { CurrencySelectContext } from '@/components/currency-select/context';
import { CurrencySearchList } from '@/components/currency-select/currency-search-list';
import { cn } from '@/lib/utils/cn';

export type CurrencySelectProps = Omit<CurrencyOptionsProps, 'coins'> & {
  value?: string | null;
  omitCoinIds?: string[];
  onChange?: (id: string) => void;
};

export const CurrencySelect: FC<CurrencySelectProps> = ({ value, omitCoinIds, onChange }) => {
  const isMobile = useIsMobile();

  const [isOpen, setIsOpen] = useState(false);

  const { searchText, setSearchText, clearSearchText } = useSearchCurrency();

  const {
    refs,
    floatingStyles,
    getReferenceProps,
    getFloatingProps
  } = useCurrencySelectFloating({
    open: isOpen,
    onOpenChange(open) {
      if (!open) clearSearchText();
      setIsOpen(open);
    }
  });

  const { coinList, isLoading, error } = useCoinList();

  const handleChangeSelection = (id: string) => {
    setIsOpen(false);
    clearSearchText();
    onChange?.(id);
  };

  const SearchListContent = (
    <CurrencySearchList
      coins={coinList}
      isLoading={isLoading}
      isError={Boolean(error)}
      searchText={searchText}
      onSearchTextChange={setSearchText}
      className={cn(isMobile ? 'p-4 pb-0' : '')}
    />
  );

  const triggerButtonProps: ComponentPropsWithoutRef<'button'> = isMobile
    ? { onClick: () => setIsOpen(true) }
    : getReferenceProps();

  const selectedCoin = coinList.find(({ uuid }) => uuid === value);

  return (
    <CurrencySelectContext value={{ value, omitCoinIds, onChange: handleChangeSelection }}>
      <button
        type="button"
        ref={refs.setReference}
        className="flex items-center gap-2 bg-white/60 rounded-full py-1 px-1.5 w-28 absolute top-3 right-3"
        {...triggerButtonProps}
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

      {isMobile && (
        <Drawer open={isOpen} onOpenChange={setIsOpen}>
          <DrawerContent>
            {SearchListContent}
          </DrawerContent>
        </Drawer>
      )}

      {!isMobile && (
        <AnimatePresence>
          {isOpen && (
            <motion.div
              ref={refs.setFloating}
              style={floatingStyles}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="bg-white rounded-xl p-3 pb-0 w-72 flex flex-col z-50"
              {...getFloatingProps()}
            >
              {SearchListContent}
            </motion.div>
          )}
        </AnimatePresence>
      )}
    </CurrencySelectContext>
  );
};
