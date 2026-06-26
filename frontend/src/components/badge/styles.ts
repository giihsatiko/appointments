import { tv } from 'tailwind-variants';

export const badgeStyles = tv({
  base: 'inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium transition-colors',
  variants: {
    variant: {
      default: 'bg-gray-100 text-gray-800',
      success: 'bg-emerald-100 text-emerald-800',
      warning: 'bg-amber-100 text-amber-800',
      danger: 'bg-red-100 text-red-800',
      info: 'bg-blue-100 text-blue-800',
    },
  },
  defaultVariants: {
    variant: 'default',
  },
});
