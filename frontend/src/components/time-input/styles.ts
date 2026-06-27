import { tv } from 'tailwind-variants';

export const timeInputStyles = tv({
  slots: {
    root: 'flex w-full flex-col gap-1.5',
    label: 'text-sm font-medium text-ink',
    required: 'text-danger',
    field:
      'flex h-11 w-full rounded-lg border border-border bg-surface px-3 py-2 text-sm tabular-nums transition-colors placeholder:text-placeholder focus:border-transparent focus:ring-2 focus:ring-primary focus:outline-none disabled:cursor-not-allowed disabled:opacity-50',
    fieldError: 'border-danger focus:ring-danger',
    error: 'text-sm text-danger',
  },
});
