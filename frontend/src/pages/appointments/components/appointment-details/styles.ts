import { tv } from 'tailwind-variants';

export const appointmentDetailsStyles = tv({
  slots: {
    body: 'flex min-w-0 flex-col gap-8 justify-between pt-2 md:flex-row',
    content: 'min-w-0 flex-1 space-y-6',
    grid: 'grid grid-cols-1 gap-6 sm:grid-cols-2',
    section: 'flex min-w-0 flex-col gap-1',
    label: 'mb-1 flex items-center gap-2 text-sm font-medium text-muted',
    value: 'text-lg font-semibold text-pretty text-ink wrap-anywhere',
    valueSmall: 'text-ink wrap-anywhere',
    sidebar: 'bg-bg-subtle p-6 rounded-lg flex flex-col gap-4 w-full md:w-64 shrink-0',
    statusLabel: 'text-sm font-medium text-muted mb-2',
    badge: 'px-3 py-1 text-sm',
    loadingSkeleton: 'p-4',
    footerRow: 'pt-4 border-t border-border mt-2',
    footerLabel: 'text-xs font-medium text-muted mb-1',
    footerValue: 'text-sm text-muted wrap-anywhere',
  },
});
