import type { FC } from 'react';
import type { Coin } from '@/model/types/data';

import { Check } from 'lucide-react';
import { cn } from '@/lib/utils/cn';

export type CurrencyOptionsProps = {
  coins: Coin[] | undefined;
  value?: string | null;
  onChange?: (id: string) => void;
};

export const CurrencyOptions: FC<CurrencyOptionsProps> = ({ coins = [], value, onChange }) => {
  const handleSelectOption = (id: string) => {
    if (onChange) onChange(id);
  }

  const renderCoinOption = (coin: Coin) => {
    const isActive = coin.uuid === value;

    return (
      <button
        key={coin.uuid}
        type="button"
        className={cn(
          'flex items-center gap-2 py-2 px-3 rounded-md cursor-pointer h-12 hover:bg-gray-50 w-full',
          { 'bg-indigo-50/60 text-primary-foreground': isActive }
        )}
        onClick={() => handleSelectOption(coin.uuid)}
      >
        <img
          alt={coin.name}
          src={coin.iconUrl}
          className="size-6 border-2 border-gray-200 bg-gray-100 rounded-full shrink-0"
        />
        <span className="grow text-left">{coin.name}</span>
        <Check size={16} className={cn(isActive ? 'visible' : 'invisible')} />
      </button>
    );
  };

  return coins.map(renderCoinOption);
};
