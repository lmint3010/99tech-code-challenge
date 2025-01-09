import type { FC } from 'react';
import type { Coin } from '@/types/data';

export type CurrencyOptionsProps = {
  coins: Coin[];
};

export const CurrencyOptions: FC<CurrencyOptionsProps> = ({ coins }) => {
  return (
    <ul className="mt-2 grow no-scrollbar overflow-y-auto">
      {coins.map((coin) => (
        <li
          key={coin.uuid}
          className="flex items-center gap-2 py-2 px-3 hover:bg-gray-100 rounded-md"
        >
          <img
            alt={coin.name}
            src={coin.iconUrl}
            className="size-6 border-2 border-gray-200 bg-gray-100 rounded-full shrink-0"
          />
          <span>{coin.name}</span>
        </li>
      ))}
    </ul>
  )
};
