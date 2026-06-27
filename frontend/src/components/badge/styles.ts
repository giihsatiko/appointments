import { tv } from 'tailwind-variants';

export const badgeStyles = tv({
  base: 'inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium transition-colors',
  variants: {
    variant: {
      default: 'bg-bg-subtle text-ink',
      success: 'bg-success/15 text-success',
      warning: 'bg-warning/15 text-warning',
      danger: 'bg-danger/15 text-danger',
      info: 'bg-primary/15 text-primary',
    },
  },
  defaultVariants: {
    variant: 'default',
  },
});
