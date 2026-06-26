import { forwardRef, useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import ReactDatePicker from 'react-datepicker';
import { Calendar as CalendarIcon } from 'lucide-react';
import { ptBR } from 'date-fns/locale/pt-BR';
import { cn } from '@/utils/cn';
import { formatMaskedDate, maskDateInput, parseMaskedDate } from '@/utils/date-input';
import { datePickerStyles } from './styles';
import type { DatePickerProps } from './types';

const CALENDAR_WIDTH = 280;
const CALENDAR_HEIGHT = 300;
const VIEWPORT_PADDING = 12;
const GAP = 8;

type PopoverPosition = { top: number; left: number };

function getPopoverPosition(
  anchor: HTMLElement,
  calendarWidth: number,
  calendarHeight: number,
): PopoverPosition {
  const rect = anchor.getBoundingClientRect();

  let left = rect.left;
  if (left + calendarWidth > window.innerWidth - VIEWPORT_PADDING) {
    left = window.innerWidth - calendarWidth - VIEWPORT_PADDING;
  }
  left = Math.max(VIEWPORT_PADDING, left);

  const belowTop = rect.bottom + GAP;
  const aboveTop = rect.top - calendarHeight - GAP;
  const maxTop = window.innerHeight - VIEWPORT_PADDING - calendarHeight;

  let top: number;

  if (belowTop <= maxTop) {
    top = belowTop;
  } else if (aboveTop >= VIEWPORT_PADDING) {
    top = aboveTop;
  } else {
    top = Math.max(VIEWPORT_PADDING, Math.min(belowTop, maxTop));
  }

  return { top, left };
}

function getPortalTarget(anchor: HTMLElement | null): HTMLElement {
  return anchor?.closest('dialog') ?? document.body;
}

export const DatePicker = forwardRef<HTMLInputElement, DatePickerProps>(
  ({ className, label, error, id, name, selected, onChange, placeholderText, ...props }, ref) => {
    const styles = datePickerStyles();
    const inputId = id || name;
    const wrapperRef = useRef<HTMLDivElement>(null);
    const anchorRef = useRef<HTMLDivElement>(null);
    const popoverRef = useRef<HTMLDivElement>(null);
    const isFocusedRef = useRef(false);

    const [inputText, setInputText] = useState('');
    const [isCalendarOpen, setIsCalendarOpen] = useState(false);
    const [popoverStyle, setPopoverStyle] = useState<PopoverPosition>(() => ({
      top: 0,
      left: 0,
    }));

    const portalTarget = isCalendarOpen ? getPortalTarget(anchorRef.current) : document.body;

    useEffect(() => {
      if (!isFocusedRef.current) {
        setInputText(selected ? formatMaskedDate(selected) : '');
      }
    }, [selected]);

    const updatePosition = useCallback(() => {
      if (!anchorRef.current) {
        return;
      }

      const { width, height } = popoverRef.current?.getBoundingClientRect() ?? {
        width: CALENDAR_WIDTH,
        height: CALENDAR_HEIGHT,
      };

      setPopoverStyle(getPopoverPosition(anchorRef.current, width, height));
    }, []);

    useLayoutEffect(() => {
      if (!isCalendarOpen || !anchorRef.current) {
        return;
      }

      updatePosition();

      const frame = requestAnimationFrame(updatePosition);

      const resizeObserver = new ResizeObserver(updatePosition);
      const popover = popoverRef.current;
      if (popover) {
        resizeObserver.observe(popover);
      }

      window.addEventListener('resize', updatePosition);
      window.addEventListener('scroll', updatePosition, true);

      return () => {
        cancelAnimationFrame(frame);
        resizeObserver.disconnect();
        window.removeEventListener('resize', updatePosition);
        window.removeEventListener('scroll', updatePosition, true);
      };
    }, [isCalendarOpen, updatePosition]);

    useLayoutEffect(() => {
      if (!isCalendarOpen) {
        return;
      }

      function handlePointerDown(event: MouseEvent) {
        const target = event.target as Node;

        if (wrapperRef.current?.contains(target) || popoverRef.current?.contains(target)) {
          return;
        }

        setIsCalendarOpen(false);
      }

      document.addEventListener('mousedown', handlePointerDown);

      return () => document.removeEventListener('mousedown', handlePointerDown);
    }, [isCalendarOpen]);

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

    function handleCalendarSelect(date: Date | null) {
      onChange(date);
      setInputText(date ? formatMaskedDate(date) : '');
      setIsCalendarOpen(false);
    }

    function toggleCalendar() {
      if (!isCalendarOpen && anchorRef.current) {
        setPopoverStyle(getPopoverPosition(anchorRef.current, CALENDAR_WIDTH, CALENDAR_HEIGHT));
      }

      setIsCalendarOpen((open) => !open);
    }

    const calendarPopover =
      isCalendarOpen &&
      createPortal(
        <div
          ref={popoverRef}
          id={inputId ? `${inputId}-calendar` : undefined}
          role="dialog"
          aria-label="Calendário"
          className={styles.popover()}
          style={{
            position: 'fixed',
            top: popoverStyle.top,
            left: popoverStyle.left,
            zIndex: 20,
          }}
          onMouseDown={(event) => event.preventDefault()}
        >
          <ReactDatePicker
            inline
            selected={selected}
            onChange={handleCalendarSelect}
            locale={ptBR}
            dateFormat="dd/MM/yyyy"
            minDate={new Date()}
            selectsMultiple={false}
            selectsRange={false}
          />
        </div>,
        portalTarget,
      );

    return (
      <div className={styles.root()}>
        {label && (
          <label htmlFor={inputId} className={styles.label()}>
            {label}
          </label>
        )}
        <div ref={wrapperRef} className={styles.fieldWrapper()}>
          <div ref={anchorRef} className={styles.inputRow()}>
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
              aria-describedby={error ? `${inputId}-error` : undefined}
              {...props}
            />
            <button
              type="button"
              className={styles.calendarButton()}
              onClick={toggleCalendar}
              aria-label={isCalendarOpen ? 'Fechar calendário' : 'Abrir calendário'}
              aria-expanded={isCalendarOpen}
              aria-controls={inputId ? `${inputId}-calendar` : undefined}
            >
              <CalendarIcon className={styles.calendarIcon()} aria-hidden="true" />
            </button>
          </div>
        </div>
        {error && (
          <span id={`${inputId}-error`} className={styles.error()} role="alert">
            {error}
          </span>
        )}
        {calendarPopover}
      </div>
    );
  },
);

DatePicker.displayName = 'DatePicker';
