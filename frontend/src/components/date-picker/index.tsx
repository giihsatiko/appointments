import { forwardRef, useState, useEffect, useRef } from 'react';
import * as Popover from '@radix-ui/react-popover';
import { DayPicker } from 'react-day-picker';
import { ptBR } from 'react-day-picker/locale';
import { ChevronLeft, ChevronRight, Calendar as CalendarIcon } from 'lucide-react';
import { cn } from '@/utils/cn';
import { formatMaskedDate, maskDateInput, parseMaskedDate } from '@/utils/date-input';
import { datePickerStyles, calendarClassNames } from './styles';
import type { DatePickerProps } from './types';

export const DatePicker = forwardRef<HTMLInputElement, DatePickerProps>(
  (
    { className, label, error, id, name, selected, onChange, placeholderText, required, ...props },
    ref,
  ) => {
    const styles = datePickerStyles();
    const inputId = id || name;
    const isFocusedRef = useRef(false);

    const [inputText, setInputText] = useState('');
    const [isCalendarOpen, setIsCalendarOpen] = useState(false);
    const [month, setMonth] = useState<Date>(selected ?? new Date());

    useEffect(() => {
      if (!isFocusedRef.current) {
        setInputText(selected ? formatMaskedDate(selected) : '');
      }
    }, [selected]);

    useEffect(() => {
      if (isCalendarOpen) {
        setMonth(selected ?? new Date());
      }
    }, [isCalendarOpen, selected]);

    function handleInputChange(event: React.ChangeEvent<HTMLInputElement>) {
      const masked = maskDateInput(event.target.value);
      setInputText(masked);
      if (masked.length === 0) {
        onChange(null);
        return;
      }
      if (masked.length === 10) {
        onChange(parseMaskedDate(masked));
      }
    }

    function handleInputBlur() {
      isFocusedRef.current = false;
      if (inputText.length === 0) {
        onChange(null);
        return;
      }
      if (inputText.length === 10) {
        const parsed = parseMaskedDate(inputText);
        onChange(parsed);
        setInputText(
          parsed ? formatMaskedDate(parsed) : selected ? formatMaskedDate(selected) : '',
        );
        return;
      }
      setInputText(selected ? formatMaskedDate(selected) : '');
    }

    function handleCalendarSelect(date: Date | undefined) {
      const value = date ?? null;
      onChange(value);
      setInputText(value ? formatMaskedDate(value) : '');
      setIsCalendarOpen(false);
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

        <Popover.Root open={isCalendarOpen} onOpenChange={setIsCalendarOpen}>
          <div className={styles.inputRow()}>
            <input
              ref={ref}
              id={inputId}
              name={name}
              type="text"
              inputMode="numeric"
              autoComplete="off"
              maxLength={10}
              value={inputText}
              placeholder={placeholderText ?? 'dd/mm/aaaa'}
              onChange={handleInputChange}
              onFocus={() => {
                isFocusedRef.current = true;
              }}
              onBlur={handleInputBlur}
              className={cn(styles.field(), error && styles.fieldError(), className)}
              aria-invalid={error ? 'true' : undefined}
              aria-required={required || undefined}
              aria-describedby={error ? `${inputId}-error` : undefined}
              required={required}
              {...props}
            />
            <Popover.Trigger asChild>
              <button
                type="button"
                className={styles.calendarButton()}
                aria-label={isCalendarOpen ? 'Fechar calendário' : 'Abrir calendário'}
                aria-expanded={isCalendarOpen}
                aria-controls={inputId ? `${inputId}-calendar` : undefined}
              >
                <CalendarIcon className={styles.calendarIcon()} aria-hidden="true" />
              </button>
            </Popover.Trigger>
          </div>

          <Popover.Portal>
            <Popover.Content
              id={inputId ? `${inputId}-calendar` : undefined}
              className={styles.popover()}
              align="start"
              sideOffset={8}
              onOpenAutoFocus={(e) => e.preventDefault()}
            >
              <DayPicker
                mode="single"
                selected={selected ?? undefined}
                onSelect={handleCalendarSelect}
                month={month}
                onMonthChange={setMonth}
                locale={ptBR}
                disabled={{ before: new Date() }}
                classNames={calendarClassNames}
                components={{
                  Chevron: ({ orientation }) =>
                    orientation === 'left' ? (
                      <ChevronLeft className="h-4 w-4" />
                    ) : (
                      <ChevronRight className="h-4 w-4" />
                    ),
                }}
              />
            </Popover.Content>
          </Popover.Portal>
        </Popover.Root>

        {error && (
          <span id={`${inputId}-error`} className={styles.error()} role="alert">
            {error}
          </span>
        )}
      </div>
    );
  },
);

DatePicker.displayName = 'DatePicker';
