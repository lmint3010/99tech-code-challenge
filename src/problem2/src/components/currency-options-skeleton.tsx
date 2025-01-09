import type { FC } from 'react';

export type CurrencyOptionsSkeletonProps = {};

export const CurrencyOptionsSkeleton: FC<CurrencyOptionsSkeletonProps> = () => {
  return (
    <ul className="mt-2 grow no-scrollbar overflow-y-auto animate-pulse">
      {Array.from({ length: 8 }, (_, id) => id).map((id) => (
        <li key={id} className="flex items-center gap-2 py-2 px-3 hover:bg-gray-100 rounded-md">
          <div className="h-6 w-6 bg-gray-100 rounded-full" />
          <div className="h-4 bg-gray-100 rounded w-1/2" />
        </li>
      ))}
    </ul>
  );
};
