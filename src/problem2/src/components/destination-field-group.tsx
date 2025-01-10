import { useEffect, useId, type FC } from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import debounce from 'lodash.debounce';

import type { CurrencySwapFormFields } from '@/model/validations/currency-swap-form-schema';
import { CurrencyInput } from '@/components/currency-input';
import { CurrencySelect } from '@/components/currency-select';
import { useCoinList } from '@/lib/hooks/use-coin-list';

export type DestinationFieldGroupProps = object;

const DEBOUNCE_DELAY = 600;

export const DestinationFieldGroup: FC<DestinationFieldGroupProps> = () => {
  const fieldId = useId();

  const form = useFormContext<CurrencySwapFormFields>();
  const { watch, formState: { errors } } = form;

  const { coinList, isLoading } = useCoinList();

  const updateDestinationAmount = debounce((fieldValues: Partial<CurrencySwapFormFields> = {}): void => {
    const { originAmount, originCoinId, destinationCoinId } = fieldValues;

    const originCoin = coinList.find(({ uuid }) => uuid === originCoinId);
    const destinationCoin = coinList.find(({ uuid }) => uuid === destinationCoinId);

    if (!originCoin || !destinationCoin || !originAmount) return;

    const destinationAmount = (originAmount * Number(originCoin.price)) / Number(destinationCoin.price);
    form.setValue('destinationAmount', destinationAmount);
  }, DEBOUNCE_DELAY);

  useEffect(() => {
    if (!coinList.length) return;

    updateDestinationAmount(form.getValues());

    const { unsubscribe } = watch(updateDestinationAmount);

    return () => unsubscribe();
  }, [watch, coinList]);

  return (
    <div className="bg-primary-backgroundLight rounded-lg py-4 px-6 flex flex-col gap-2 relative">
      <label htmlFor={fieldId} className="text-sm font-medium text-indigo-700 cursor-pointer">
        Get
      </label>
      <Controller
        control={form.control}
        name="destinationAmount"
        render={({ field: { value } }) => (
          <CurrencyInput
            id={fieldId}
            value={value}
            placeholder={isLoading ? 'Loading...' : '0.00'}
            readonly
          />
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
      <div className="text-xs font-medium text-gray-800 leading-tight">
        No transfer fee for <span className="text-indigo-700">Diamond</span> members
      </div>
    </div>
  );
};
