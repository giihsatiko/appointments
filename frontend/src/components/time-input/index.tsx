import { forwardRef } from 'react';
import { cn } from '@/utils/cn';
import { maskTimeInput, normalizeTimeInput } from '@/utils/time-input';
import { timeInputStyles } from './styles';
import type { TimeInputProps } from './types';

export const TimeInput = forwardRef<HTMLInputElement, TimeInputProps>(
  (
    { label, error, id, name, value = '', placeholder = '09:00', onChange, onBlur, required },
    ref,
  ) => {
    const styles = timeInputStyles();
    const inputId = id || name;

    function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
      onChange(maskTimeInput(event.target.value));
    }

    function handleBlur() {
      const normalized = normalizeTimeInput(value);

      if (normalized !== value) {
        onChange(normalized);
        queueMicrotask(() => onBlur?.());
        return;
      }

      onBlur?.();
    }

    return (
      <div className={styles.root()}>
        {label && (
          <label htmlFor={inputId} className={styles.label()}>
            {label}
            {required && (
              <>
                <span className={styles.required()} aria-hidden="true">
                  *
                </span>
                <span className="sr-only"> (obrigatório)</span>
              </>
            )}
          </label>
        )}
        <input
          ref={ref}
          id={inputId}
          name={name}
          type="text"
          inputMode="numeric"
          autoComplete="off"
          maxLength={5}
          placeholder={placeholder}
          value={value}
          onChange={handleChange}
          onBlur={handleBlur}
          className={cn(styles.field(), error && styles.fieldError())}
          aria-invalid={!!error}
          aria-required={required || undefined}
          aria-describedby={error ? `${inputId}-error` : undefined}
          required={required}
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

TimeInput.displayName = 'TimeInput';
