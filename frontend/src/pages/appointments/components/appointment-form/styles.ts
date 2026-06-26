import { tv } from 'tailwind-variants';

export const appointmentFormStyles = tv({
  slots: {
    form: 'flex flex-col gap-5 pt-2',
    scheduleRow: 'grid grid-cols-1 gap-5 sm:grid-cols-[minmax(0,1fr)_9.5rem] sm:items-start',
  },
});
