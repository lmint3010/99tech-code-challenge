import { useEffect, useId, type FC } from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import debounce from 'lodash.debounce';

import type { CurrencySwapFormFields } from '@/model/validations/currency-swap-form-schema';
import { CurrencyInput } from '@/components/currency-input';
import { CurrencySelect } from '@/components/currency-select';
import { formatNumber } from '@/lib/utils/format';
import { useCoinList } from '@/lib/hooks/use-coin-list';

export type DestinationFieldGroupProps = object;

export const DestinationFieldGroup: FC<DestinationFieldGroupProps> = () => {
  const fieldId = useId();
  
  const form = useFormContext<CurrencySwapFormFields>();
  const { watch, formState: { errors } } = form;

  const { coinList } = useCoinList();

  useEffect(() => {
    if (!coinList.length) return;

    const updateDestinationAmount = debounce(({ originAmount, originCoinId, destinationCoinId }: Partial<CurrencySwapFormFields>) => {
      const originCoin = coinList.find(({ uuid }) => uuid === originCoinId);
      const destinationCoin = coinList.find(({ uuid }) => uuid === destinationCoinId);

      if (!originCoin || !destinationCoin || !originAmount) return;

      const destinationAmount = (originAmount * Number(originCoin.price)) / Number(destinationCoin.price);
      form.setValue('destinationAmount', destinationAmount);
    }, 600);

    const { unsubscribe } = watch(updateDestinationAmount);
    return () => unsubscribe();
  }, [watch, coinList, form]);

  return (
    <div className="bg-primary-backgroundLight rounded-lg py-4 px-6 flex flex-col gap-2 relative">
      <label htmlFor={fieldId} className="text-sm font-medium text-indigo-700 cursor-pointer">
        Get
      </label>
      <Controller
        control={form.control}
        name="destinationAmount"
        render={({ field: { value } }) => (
          <CurrencyInput id={fieldId} value={value} placeholder="" readonly />
        )}
      />
      <div className="flex flex-col font-light text-sm gap-1 text-red-700">
        <span>{errors.destinationCoinId?.message}</span>
      </div>
      <Controller
        control={form.control}
        name="destinationCoinId"
        render={({ field: { value, onChange } }) => (
          <CurrencySelect value={value} onChange={onChange} />
        )}
      />
      <div className="flex items-center gap-1.5 text-sm">
        <span className="text-gray-600 text-xs leading-tight">Estimated Fee</span>
        <span className="font-semibold text-gray-800">{formatNumber(0)}</span>
      </div>
    </div>
  );
};
