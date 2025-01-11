import type { ComponentPropsWithoutRef, FC, PropsWithChildren } from 'react';

import { cn } from '@/lib/utils/cn';
import { LoaderCircle } from 'lucide-react';

export type AsyncButtonProps = PropsWithChildren<ComponentPropsWithoutRef<'button'> & {
  isLoading: boolean;
}>;

export const AsyncButton: FC<AsyncButtonProps> = ({ isLoading, children, ...buttonProps }) => {
  return (
    <button
      {...buttonProps}
      className={cn(
        "flex justify-center items-center gap-3 duration-100",
        "bg-gradient-to-r from-indigo-500 to-indigo-700 py-2.5 rounded-lg text-primary-background",
        "disabled:opacity-50 disabled:cursor-not-allowed",
        buttonProps.className,
      )}
      disabled={buttonProps.disabled || isLoading}
    >
      <LoaderCircle className={cn('animate-spin', isLoading ? 'block' : 'hidden')} />
      {children}
    </button>
  );
};
