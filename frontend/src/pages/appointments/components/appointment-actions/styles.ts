import { tv } from 'tailwind-variants';

export const appointmentActionsStyles = tv({
  slots: {
    root: 'flex items-center gap-2',
    actionButton: 'h-11 w-11 min-h-11 min-w-11 shrink-0 transition-colors',
    actionButtonCheckin:
      'h-11 w-11 min-h-11 min-w-11 shrink-0 text-success transition-colors hover:bg-success/10 hover:text-success',
    actionButtonDelete:
      'h-11 w-11 min-h-11 min-w-11 shrink-0 text-danger transition-colors hover:bg-danger/10 hover:text-danger-hover',
    icon: 'h-5 w-5',
  },
  variants: {
    layout: {
      desktop: {
        root: 'justify-end',
      },
      mobile: {
        root: 'pt-2 border-t border-border',
      },
    },
  },
});
