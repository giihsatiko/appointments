import { tv } from 'tailwind-variants';

export const datePickerStyles = tv({
  slots: {
    root: 'flex w-full flex-col gap-1.5',
    label: 'text-sm font-medium text-ink',
    required: 'text-danger',
    fieldWrapper: 'relative',
    inputRow: 'relative',
    field:
      'flex h-11 w-full rounded-lg border border-border bg-surface py-2 pr-12 pl-3 text-sm transition-colors placeholder:text-placeholder focus-visible:border-transparent focus-visible:ring-2 focus-visible:ring-primary focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50',
    fieldError: 'border-danger focus-visible:ring-danger',
    calendarButton:
      'absolute top-1/2 right-1 inline-flex h-11 w-11 min-h-11 min-w-11 -translate-y-1/2 items-center justify-center rounded-md text-muted transition-colors hover:bg-bg-subtle hover:text-ink focus-visible:ring-2 focus-visible:ring-primary focus-visible:outline-none',
    calendarIcon: 'h-5 w-5',
    popover: 'date-picker-popover z-20 w-fit',
    error: 'text-sm text-danger',
  },
});
