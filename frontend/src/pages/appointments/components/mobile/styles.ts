import { tv } from 'tailwind-variants';

export const appointmentsMobileStyles = tv({
  slots: {
    root: 'flex flex-col gap-3 md:hidden',
    card: 'p-4 flex flex-col gap-3',
    cardRow: 'flex items-center justify-between gap-2',
    name: 'font-medium text-ink truncate',
  },
});
