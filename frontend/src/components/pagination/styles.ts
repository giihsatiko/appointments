import { tv } from 'tailwind-variants';

export const paginationStyles = tv({
  slots: {
    root: 'mt-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between',
    info: 'text-sm text-muted',
    bold: 'font-semibold text-ink',
    buttons: 'flex gap-2',
  },
});
