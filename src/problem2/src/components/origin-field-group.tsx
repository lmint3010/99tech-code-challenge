import type { CurrencySwapFormFields } from '@/model/validations/currency-swap-form-schema';

import { useId, type FC } from 'react';
import { Controller, useFormContext } from 'react-hook-form';

import { CurrencyInput } from '@/components/currency-input';
import { formatNumber } from '@/lib/utils/format';
import { useUserBalance } from '@/lib/hooks/use-user-balance';
import { CurrencySelect } from '@/components/currency-select';

export type OriginFieldGroupProps = object;

export const OriginFieldGroup: FC<OriginFieldGroupProps> = () => {
  const fieldId = useId();

  const userBalance = useUserBalance();

  const form = useFormContext<CurrencySwapFormFields>();

  const { errors } = form.formState;

  return (
    <>
      <div className="bg-primary-backgroundLight rounded-lg py-4 px-6 flex flex-col gap-2 relative">
        <label
          htmlFor={fieldId}
          className="text-sm font-medium text-indigo-700 cursor-pointer"
        >
          Amount
        </label>
        <Controller
          control={form.control}
          name="originAmount"
          render={({ field: { value, onChange } }) => (
            <>
              <CurrencyInput
                id={fieldId}
                value={value}
                placeholder='Enter amount'
                onChange={value => onChange({ target: { value } })}
              />
              <div className="flex flex-col font-light text-sm gap-1 text-red-700">
                <span>{errors.originAmount?.message}</span>
                <span>{errors.originCoinId?.message}</span>
              </div>
            </>
          )}
        />
        <Controller
          control={form.control}
          name='originCoinId'
          render={({ field: { value, onChange } }) => (
            <CurrencySelect
              value={value}
              onChange={value => onChange({ target: { value } })}
            />
          )}
        />
        <div className="flex items-end gap-1.5 text-sm">
          <span className="text-gray-600 text-xs">Available</span>
          <span className="font-semibold text-gray-800">
            {formatNumber(userBalance)}
          </span>
        </div>
      </div>
    </>
  )
};
