import { tv } from 'tailwind-variants';

export const paginationStyles = tv({
  slots: {
    root: 'flex items-center justify-between mt-4',
    info: 'text-sm text-muted',
    bold: 'font-semibold text-ink',
    buttons: 'flex gap-2',
  },
});
