import { useEffect, useId, type FC } from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import debounce from 'lodash.debounce';

import type { CurrencySwapFormFields } from '@/model/validations/currency-swap-form-schema';
import { CurrencyInput } from '@/components/currency-input';
import { CurrencySelect } from '@/components/currency-select/currency-select';
import { useCoinList } from '@/lib/hooks/use-coin-list';
import { EXTERNAL_URLS } from '@/model/constants/external-urls';

export type DestinationFieldGroupProps = object;

const DEBOUNCE_DELAY = 600;

export const DestinationFieldGroup: FC<DestinationFieldGroupProps> = () => {
  const fieldId = useId();

  const form = useFormContext<CurrencySwapFormFields>();
  const { watch } = form;

  const { coinList, isLoading } = useCoinList();

  const updateDestinationAmount = debounce((fieldValues: Partial<CurrencySwapFormFields> = {}): void => {
    const { originAmount, originCoinId, destinationCoinId } = fieldValues;

    const originCoin = coinList.find(({ uuid }) => uuid === originCoinId);
    const destinationCoin = coinList.find(({ uuid }) => uuid === destinationCoinId);

    if (!originCoin || !destinationCoin) return;

    if (!originAmount) {
      form.resetField('destinationAmount');
      return;
    }

    const destinationAmount = (originAmount * Number(originCoin.price)) / Number(destinationCoin.price);

    form.setValue('destinationAmount', destinationAmount);
  }, DEBOUNCE_DELAY);

  useEffect(() => {
    if (!coinList.length) return;

    updateDestinationAmount(form.getValues());

    const { unsubscribe } = watch(updateDestinationAmount);

    return () => unsubscribe();
  }, [watch, coinList]);

  const originCoinId = watch('originCoinId');

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
      <Controller
        control={form.control}
        name="destinationCoinId"
        render={({ field: { value, onChange } }) => (
          <CurrencySelect
            value={value}
            onChange={onChange}
            omitCoinIds={[originCoinId]}
          />
        )}
      />
      <div className="text-xs font-medium text-gray-800 leading-tight">
        No transfer fee for
        <a
          href={EXTERNAL_URLS.DIAMOND_MEMBERSHIP}
          target='_blank'
          rel="noreferrer"
          className="text-indigo-700 underline px-1"
        >
          Diamond
        </a>
        members
      </div>
    </div>
  );
};
