import { forwardRef } from 'react';
import { Loader2 } from 'lucide-react';
import { buttonStyles } from './styles';
import type { ButtonProps } from './types';

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(function Button(
  { className, variant = 'primary', size = 'default', isLoading, children, disabled, ...props },
  ref,
) {
  return (
    <button
      ref={ref}
      className={buttonStyles({ variant, size, className })}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading && <Loader2 className="h-4 w-4 animate-spin" />}
      {children}
    </button>
  );
});
