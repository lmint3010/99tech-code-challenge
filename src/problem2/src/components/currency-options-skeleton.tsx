import type { FC } from 'react';

export type CurrencyOptionsSkeletonProps = {
  fakeItems?: number;
};

export const CurrencyOptionsSkeleton: FC<CurrencyOptionsSkeletonProps> = ({ fakeItems = 5 }) => {
  const skeletonItems = Array.from({ length: Math.ceil(fakeItems) }, (_, id) => id);

  const renderSkeletonItem = (id: number) => (
    <li key={id} className="flex items-center gap-2 py-2 px-3 hover:bg-gray-100 rounded-md h-12">
      <div className="h-6 w-6 bg-gray-100 rounded-full" />
      <div className="h-4 bg-gray-100 rounded w-1/2" />
    </li>
  );

  return (
    <ul className="mt-2 grow no-scrollbar overflow-y-auto animate-pulse">
      {skeletonItems.map(renderSkeletonItem)}
    </ul>
  );
};
