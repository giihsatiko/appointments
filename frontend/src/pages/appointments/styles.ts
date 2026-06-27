import { tv } from 'tailwind-variants';

export const appointmentsStyles = tv({
  slots: {
    container: 'w-full max-w-5xl mx-auto p-4 md:p-8 flex flex-col gap-6',
    header: 'flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4',
    headerContent: 'flex flex-col gap-1',
    title: 'text-2xl font-bold text-ink tracking-tight text-balance',
    subtitle: 'text-muted text-sm',
    headerActions: 'flex items-center gap-2',
    errorCard: 'border-danger/25 bg-danger/5 p-4',
    errorMessage: 'text-sm font-medium text-danger',
    skeletonContainer: 'flex flex-col gap-4',
    skeletonRow: 'h-16 w-full rounded-lg',
  },
});
