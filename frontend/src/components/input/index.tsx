import { forwardRef } from 'react';
import { cn } from '@/utils/cn';
import { inputStyles } from './styles';
import type { InputProps } from './types';

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, label, error, id, ...props }, ref) => {
    const styles = inputStyles();
    const inputId = id || props.name;

    return (
      <div className={styles.root()}>
        {label && (
          <label htmlFor={inputId} className={styles.label()}>
            {label}
          </label>
        )}
        <input
          id={inputId}
          ref={ref}
          className={cn(styles.field(), error && styles.fieldError(), className)}
          aria-invalid={!!error}
          aria-describedby={error ? `${inputId}-error` : undefined}
          {...props}
        />
        {error && (
          <span id={`${inputId}-error`} className={styles.error()} role="alert">
            {error}
          </span>
        )}
      </div>
    );
  },
);

Input.displayName = 'Input';
