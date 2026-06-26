import { tv } from 'tailwind-variants';

export const buttonStyles = tv({
  base: 'inline-flex cursor-pointer items-center justify-center gap-2 rounded-lg font-medium transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 motion-safe:active:scale-95 disabled:opacity-50 disabled:pointer-events-none',
  variants: {
    variant: {
      primary: 'bg-primary text-white hover:bg-primary-hover focus-visible:ring-primary',
      secondary: 'bg-bg-subtle text-ink hover:bg-border focus-visible:ring-muted',
      danger: 'bg-danger text-white hover:bg-danger-hover focus-visible:ring-danger',
      ghost: 'bg-transparent text-muted hover:bg-bg-subtle hover:text-ink focus-visible:ring-muted',
    },
    size: {
      default: 'h-11 min-h-11 px-4 py-2 text-sm',
      sm: 'h-11 min-h-11 px-4 text-sm rounded-md',
      lg: 'h-12 px-8 text-base rounded-xl',
      icon: 'h-11 w-11 min-h-11 min-w-11',
    },
  },
  defaultVariants: {
    variant: 'primary',
    size: 'default',
  },
});
