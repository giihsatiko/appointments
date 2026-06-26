import { Button } from '@/components/button';
import { paginationStyles } from './styles';
import type { PaginationProps } from './types';

export function Pagination({ currentPage, totalPages, onPageChange }: PaginationProps) {
  const styles = paginationStyles();

  return (
    <div className={styles.root()}>
      <div className={styles.info()} aria-live="polite" aria-atomic="true">
        Página <span className={styles.bold()}>{currentPage}</span> de{' '}
        <span className={styles.bold()}>{totalPages}</span>
      </div>
      <div className={styles.buttons()}>
        <Button
          variant="secondary"
          size="sm"
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
          Anterior
        </Button>
        <Button
          variant="secondary"
          size="sm"
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          Próxima
        </Button>
      </div>
    </div>
  );
}
