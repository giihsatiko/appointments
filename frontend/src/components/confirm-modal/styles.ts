import { tv } from 'tailwind-variants';

export const confirmModalStyles = tv({
  slots: {
    body: 'flex min-w-0 flex-col gap-3 text-left',
    description: 'min-w-0 text-sm leading-relaxed text-pretty text-muted wrap-anywhere',
    highlight:
      'min-w-0 w-full rounded-lg bg-bg-subtle px-3 py-2 text-sm font-medium text-pretty text-ink wrap-anywhere',
  },
});
