import { tv } from 'tailwind-variants';

export const tableStyles = tv({
  slots: {
    wrapper:
      'relative max-h-[600px] w-full overflow-auto rounded-lg border border-border bg-surface',
    table: 'w-full caption-bottom text-sm',
    header: 'sticky top-0 z-10 border-border bg-bg/95 backdrop-blur-sm [&_tr]:border-b',
    body: '[&_tr:last-child]:border-0',
    row: 'cursor-default border-b border-border transition-colors hover:bg-bg-subtle/70 data-[state=selected]:bg-bg-subtle',
    head: 'h-10 px-4 text-left align-middle font-medium text-muted [&:has([role=checkbox])]:pr-0',
    cell: 'p-4 align-middle [&:has([role=checkbox])]:pr-0',
  },
});
