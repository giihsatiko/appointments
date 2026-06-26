import { tv } from 'tailwind-variants';

export const emptyStateStyles = tv({
  slots: {
    root: 'flex min-h-[300px] flex-col items-center justify-center rounded-xl border border-dashed border-border bg-surface p-8 text-center',
    iconWrapper: 'mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-bg-subtle',
    icon: 'h-6 w-6 text-muted',
    title: 'mb-1 text-lg font-semibold text-ink',
    description: 'mb-4 max-w-sm text-sm text-muted',
  },
});
