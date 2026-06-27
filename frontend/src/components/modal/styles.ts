import { tv } from 'tailwind-variants';

export const modalStyles = tv({
  slots: {
    dialog:
      'fixed inset-0 z-50 m-0 hidden h-full max-h-none w-full max-w-none overflow-hidden border-0 bg-transparent p-4 open:flex open:items-center open:justify-center',
    panel:
      'relative z-10 flex w-full max-w-md flex-col overflow-visible rounded-xl bg-surface shadow-xl',
    header:
      'relative z-10 grid shrink-0 grid-cols-[minmax(0,1fr)_auto] items-center gap-3 rounded-t-xl border-b border-border p-4',
    title: 'min-w-0 text-left text-lg font-semibold leading-snug text-ink',
    closeButton: 'h-11 w-11 shrink-0 rounded-full p-0',
    body: 'min-w-0 overflow-visible p-4',
    footer:
      'flex shrink-0 justify-end gap-3 rounded-b-xl border-t border-border bg-bg-subtle/50 p-4',
  },
});
