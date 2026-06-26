import { tv } from 'tailwind-variants';

export const appointmentsDesktopStyles = tv({
  slots: {
    root: 'hidden md:block',
    tableHeadRight: 'text-right',
    tableCellMuted: 'text-muted',
    tableCellRight: 'text-right',
    cellName: 'font-medium text-ink max-w-[200px] truncate',
  },
});
