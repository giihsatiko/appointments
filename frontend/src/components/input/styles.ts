import { tv } from 'tailwind-variants';

export const inputStyles = tv({
  slots: {
    root: 'flex w-full flex-col gap-1.5',
    label: 'text-sm font-medium text-ink',
    required: 'text-danger',
    field:
      'flex h-11 w-full rounded-lg border border-border bg-surface px-3 py-2 text-sm transition-colors placeholder:text-placeholder focus-visible:border-transparent focus-visible:ring-2 focus-visible:ring-primary focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50',
    fieldError: 'border-danger focus-visible:ring-danger',
    error: 'text-sm text-danger',
  },
});
