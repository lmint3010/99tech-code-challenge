import { useId, type FC } from 'react';

import { CurrencyInput } from '@/components/currency-input';
import { CurrencySelect } from '@/components/currency-select';
import { formatNumber } from '@/lib/utils/format';
import { parseAsInteger, useQueryState } from 'nuqs';

export type OriginFieldGroupProps = object;

export const OriginFieldGroup: FC<OriginFieldGroupProps> = () => {
  const fieldId = useId();

  const [amount, setAmount] = useQueryState('originAmount', parseAsInteger);
  const [fromId, setFromId] = useQueryState('fromId');

  return (
    <div className="bg-primary-backgroundLight rounded-lg py-4 px-6 flex flex-col gap-2">
      <label
        htmlFor={fieldId}
        className="text-sm font-medium text-indigo-700 cursor-pointer"
      >
        Amount
      </label>
      <CurrencyInput id={fieldId} value={amount} onChange={setAmount} />
      <CurrencySelect value={fromId} onChange={setFromId} />
      <div className="flex items-end gap-1.5 text-sm">
        <span className="text-gray-600 text-xs">Available</span>
        <span className="font-semibold text-gray-800">
          {formatNumber(100_000_000)}
        </span>
      </div>
    </div>
  )
};
