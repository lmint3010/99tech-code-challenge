import { cn } from '@/lib/utils/cn';
import type { FC } from 'react';

export type FormErrorMessageProps = {
  message?: string;
};

export const FormErrorMessage: FC<FormErrorMessageProps> = ({ message }) => {
  return (
    <div
      className={cn(
        'flex flex-col gap-1',
        'text-sm text-red-700',
        'absolute bg-white px-4 py-1.5 rounded top-full mt-2 z-[100]',
        message ? 'visible' : 'invisible'
      )}
    >
      <div
        className={cn(
          "absolute w-3 h-2 bg-white",
          "top-0 left-8",
          "-translate-y-full -translate-x-1/2"
        )}
        style={{ clipPath: 'polygon(50% 0%, 0% 100%, 100% 100%)' }}
      />
      {message}
    </div>
  )
};
