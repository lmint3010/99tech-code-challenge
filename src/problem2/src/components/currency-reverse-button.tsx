import type { FC } from 'react';
import type { CurrencySwapFormFields } from '@/model/validations/currency-swap-form-schema';

import SwapIcon from "@/model/assets/icons/swap.svg";
import { cn } from '@/lib/utils/cn';
import { useFormContext } from 'react-hook-form';

export type CurrencyReverseButtonProps = {
  className?: string;
};

export const CurrencyReverseButton: FC<CurrencyReverseButtonProps> = ({ className }) => {
  const form = useFormContext<CurrencySwapFormFields>();

  const handleReverseCurrency = () => {
    const [currentOriginCoinId, currentDestinationCoinId] = form.getValues(['originCoinId', 'destinationCoinId']);

    form.setValue('originCoinId', currentDestinationCoinId);
    form.setValue('destinationCoinId', currentOriginCoinId);
  };

  return (
    <button
      type="button"
      className={cn(
        "size-12 rounded-full bg-indigo-700 border-[6px] border-primary-background grid place-items-center",
        "duration-150 ease-out",
        "hover:bg-indigo-800 hover:scale-105 active:scale-95",
        className,
      )}
      onClick={handleReverseCurrency}
    >
      <SwapIcon className="size-8/12 rotate-90 text-white" />
    </button>
  )
};
