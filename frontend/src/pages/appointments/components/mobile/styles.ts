import { tv } from 'tailwind-variants';

export const appointmentsMobileStyles = tv({
  slots: {
    root: 'flex flex-col gap-3 md:hidden',
    card: 'flex flex-col gap-3 p-4',
    cardRow: 'flex items-center justify-between gap-2',
    name: 'truncate font-medium text-ink',
    meta: 'grid grid-cols-1 gap-2 sm:grid-cols-3',
    metaItem: 'flex min-w-0 flex-col gap-0.5',
    metaLabel: 'flex items-center gap-1.5 text-xs font-medium text-muted',
    metaIcon: 'h-3.5 w-3.5 shrink-0',
    metaValue: 'truncate text-sm text-ink',
  },
});
