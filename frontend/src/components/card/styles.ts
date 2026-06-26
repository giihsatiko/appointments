import { tv } from 'tailwind-variants';

export const cardStyles = tv({
  slots: {
    root: 'rounded-xl border border-border bg-surface text-ink shadow-sm',
    header: 'flex flex-col space-y-1.5 p-6',
    title: 'leading-none font-semibold tracking-tight',
    description: 'text-sm text-muted',
    content: 'p-6 pt-0',
    footer: 'flex items-center p-6 pt-0',
  },
});
