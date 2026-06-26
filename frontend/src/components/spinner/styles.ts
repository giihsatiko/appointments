import { tv } from 'tailwind-variants';

export const spinnerStyles = tv({
  slots: {
    root: 'flex items-center justify-center',
    icon: 'animate-spin text-primary motion-reduce:animate-none',
  },
  variants: {
    size: {
      sm: { icon: 'h-4 w-4' },
      md: { icon: 'h-6 w-6' },
      lg: { icon: 'h-8 w-8' },
      xl: { icon: 'h-12 w-12' },
    },
  },
  defaultVariants: {
    size: 'md',
  },
});
