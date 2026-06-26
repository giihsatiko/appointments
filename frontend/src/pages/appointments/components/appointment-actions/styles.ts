import { tv } from 'tailwind-variants';

export const appointmentActionsStyles = tv({
  slots: {
    root: 'flex items-center gap-2',
    actionButton: 'h-11 w-11 min-h-11 min-w-11 shrink-0 transition-colors',
    actionButtonCheckin:
      'h-11 w-11 min-h-11 min-w-11 shrink-0 transition-colors text-success hover:bg-emerald-50 hover:text-emerald-700',
    actionButtonDelete:
      'h-11 w-11 min-h-11 min-w-11 shrink-0 transition-colors text-danger hover:bg-red-50 hover:text-red-700',
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
