import { tv } from 'tailwind-variants';

export const appointmentsStyles = tv({
  slots: {
    container: 'w-full max-w-5xl mx-auto p-4 md:p-8 flex flex-col gap-6',
    header: 'flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4',
    headerContent: 'flex flex-col gap-1',
    title: 'text-2xl font-bold text-ink tracking-tight text-balance',
    subtitle: 'text-muted text-sm',
    headerActions: 'flex items-center gap-2',
    errorCard: 'border-red-200 bg-red-50 p-4',
    errorMessage: 'text-red-800 text-sm font-medium mb-2',
    skeletonContainer: 'flex flex-col gap-4',
    skeletonRow: 'h-16 w-full rounded-lg',
  },
});
