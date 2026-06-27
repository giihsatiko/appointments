import { tv } from 'tailwind-variants';

export const datePickerStyles = tv({
  slots: {
    root: 'flex w-full flex-col gap-1.5',
    label: 'text-sm font-medium text-ink',
    required: 'text-danger',
    inputRow: 'relative',
    field:
      'flex h-11 w-full rounded-lg border border-border bg-surface py-2 pr-12 pl-3 text-sm transition-colors placeholder:text-placeholder focus-visible:border-transparent focus-visible:ring-2 focus-visible:ring-primary focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50',
    fieldError: 'border-danger focus-visible:ring-danger',
    calendarButton:
      'absolute top-1/2 right-1 inline-flex h-11 w-11 min-h-11 min-w-11 -translate-y-1/2 items-center justify-center rounded-md text-muted transition-colors hover:bg-bg-subtle hover:text-ink focus-visible:ring-2 focus-visible:ring-primary focus-visible:outline-none',
    calendarIcon: 'h-5 w-5',
    popover: 'z-[60] w-fit rounded-xl border border-border bg-surface p-3 shadow-xl',
    error: 'text-sm text-danger',
  },
});

export const calendarClassNames = {
  root: 'font-sans text-sm text-ink w-[280px]',
  month_grid: 'w-full',
  months: 'relative',
  month: 'w-full',
  month_caption: 'flex items-center justify-center py-1 mb-2',
  caption_label: 'text-sm font-semibold text-ink capitalize',
  nav: 'absolute top-0 inset-x-0 flex items-center justify-between',
  button_previous:
    'flex h-8 w-8 items-center justify-center rounded-md text-muted transition-colors hover:bg-bg-subtle hover:text-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary',
  button_next:
    'flex h-8 w-8 items-center justify-center rounded-md text-muted transition-colors hover:bg-bg-subtle hover:text-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary',
  weekdays: 'grid grid-cols-7 mb-1',
  weekday: 'text-center text-xs font-medium text-muted py-1',
  weeks: 'flex flex-col gap-1',
  week: 'grid grid-cols-7',
  day: 'flex items-center justify-center',
  day_button:
    'h-8 w-full rounded-lg text-sm transition-colors hover:bg-bg-subtle focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary',
  selected:
    '[&>button]:bg-primary [&>button]:text-surface [&>button]:font-medium [&>button]:hover:bg-primary-hover',
  today: '[&>button]:font-semibold',
  disabled: '[&>button]:text-border [&>button]:cursor-default [&>button]:hover:bg-transparent',
  outside: '[&>button]:text-muted [&>button]:opacity-50',
};
