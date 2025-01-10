import { useState, type FC } from 'react';

import useSWR from 'swr';
import { useFloating, useClick, offset, shift, autoPlacement, useInteractions } from '@floating-ui/react';

import { AnimatePresence, motion } from 'motion/react';
import { fetchCoinList } from '@/api/fetch-coin-list';
import { SWR_CACHE_KEYS } from '@/constants/swr-keys';
import { ChevronDown } from 'lucide-react';
import { CurrencyOptions } from '@/components/currency-options';
import { CurrencyOptionsSkeleton } from '@/components/currency-options-skeleton';

const VISIBLE_OPTIONS = 5.5;
const OPTION_HEIGHT = 48;
const LIST_HEIGHT = VISIBLE_OPTIONS * OPTION_HEIGHT;

export type CurrencySelectProps = object;

export const CurrencySelect: FC<CurrencySelectProps> = () => {
  const [isOpen, setIsOpen] = useState(false);

  const { data: coints, isLoading } = useSWR(
    isOpen ? SWR_CACHE_KEYS.COIN_LIST : null,
    fetchCoinList
  );

  const { refs, floatingStyles, context } = useFloating({
    open: isOpen,
    onOpenChange: setIsOpen,
    placement: 'right-start',
    middleware: [offset(8), shift(), autoPlacement({
      allowedPlacements: ['right-start', 'right-end', 'right']
    })]
  });

  const click = useClick(context);

  const { getReferenceProps, getFloatingProps } = useInteractions([click]);

  const totalCoins = coints?.length ?? 0;

  return (
    <>
      <button
        type="button"
        ref={refs.setReference}
        className="flex items-center gap-2 bg-white/60 rounded-full py-1 px-1.5 max-w-28 absolute top-3 right-3"
        {...getReferenceProps()}
      >
        <div className="size-6 bg-gray-100 rounded-full shrink-0" />
        <span className="max-w-[5ch] truncate grow">ANC</span>
        <ChevronDown size={16} />
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
              <CurrencyOptions coins={coints} selectedId='HIVsRcGKkPFtW' />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
