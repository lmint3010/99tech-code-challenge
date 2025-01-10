import type { FC } from 'react';
import { Controller, useFormContext } from 'react-hook-form';

import type { CurrencySwapFormFields } from '@/model/validations/currency-swap-form-schema';
import { CurrencyInput } from '@/components/currency-input';
import { CurrencySelect } from '@/components/currency-select';
import { formatNumber } from '@/lib/utils/format';

export type DestinationFieldGroupProps = object;

export const DestinationFieldGroup: FC<DestinationFieldGroupProps> = () => {
  const form = useFormContext<CurrencySwapFormFields>();

  const { errors } = form.formState;

  return (
    <div className="bg-primary-backgroundLight rounded-lg py-4 px-6 flex flex-col gap-2 relative">
      <label
        htmlFor="output-amount"
        className="text-sm font-medium text-indigo-700 cursor-pointer"
      >
        Get
      </label>
      <CurrencyInput id="output-amount" value={123_000} readonly />
      <div className="flex flex-col font-light text-sm gap-1 text-red-700">
        <span>{errors.destinationCoin?.message}</span>
      </div>
      <Controller
        control={form.control}
        name="destinationCoin"
        render={({ field: { value, onChange } }) => (
          <CurrencySelect value={value} onChange={onChange} />
        )}
      />
      <div className="flex items-center gap-1.5 text-sm">
        <span className="text-gray-600 text-xs leading-tight">
          Estimated Fee
        </span>
        <span className="font-semibold text-gray-800">
          {formatNumber(0)}
        </span>
      </div>
    </div>
  );
};
