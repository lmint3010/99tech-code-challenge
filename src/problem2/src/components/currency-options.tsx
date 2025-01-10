import type { FC } from 'react';
import type { Coin } from '@/types/data';

import { Check } from 'lucide-react';
import { cn } from '@/utils/cn';

export type CurrencyOptionsProps = {
  coins: Coin[] | undefined;
  selectedId: string;
  onSelect?: (selectedId: string) => void;
};

export const CurrencyOptions: FC<CurrencyOptionsProps> = ({ coins = [], selectedId, onSelect }) => {
  const handleSelectOption = (id: string) => {
    if (onSelect) {
      onSelect(id);
    }
  }

  const renderCoinOption = (coin: Coin) => {
    const isActive = coin.uuid === selectedId;

    return (
      <button
        key={coin.uuid}
        type="button"
        className={cn(
          'flex items-center gap-2 py-2 px-3 rounded-md cursor-pointer h-12 hover:bg-gray-50',
          { 'bg-indigo-50/60 text-primary-foreground': isActive }
        )}
        onClick={() => handleSelectOption(coin.uuid)}
      >
        <img
          alt={coin.name}
          src={coin.iconUrl}
          className="size-6 border-2 border-gray-200 bg-gray-100 rounded-full shrink-0"
        />
        <span className="grow">{coin.name}</span>
        <Check size={16} className={cn(isActive ? 'visible' : 'invisible')} />
      </button>
    );
  };

  return coins.map(renderCoinOption);
};
