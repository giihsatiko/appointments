import { tv } from 'tailwind-variants';

export const confirmModalStyles = tv({
  slots: {
    body: 'flex flex-col gap-3 text-left',
    description: 'text-sm leading-relaxed text-pretty text-muted',
    highlight: 'rounded-lg bg-bg-subtle px-3 py-2 text-sm font-medium text-ink',
  },
});
