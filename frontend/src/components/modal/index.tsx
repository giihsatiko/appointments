import { useEffect, useRef } from 'react';
import { X } from 'lucide-react';
import { cn } from '@/utils/cn';
import { Button } from '@/components/button';
import { modalStyles } from './styles';
import type { ModalProps } from './types';

export function Modal({
  isOpen,
  onClose,
  title,
  titleId = 'modal-title',
  children,
  footer,
  className,
}: ModalProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const styles = modalStyles();

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    if (isOpen && !dialog.open) {
      dialog.show();
    } else if (!isOpen && dialog.open) {
      dialog.close();
    }
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        onClose();
      }
    }

    document.addEventListener('keydown', handleKeyDown);

    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  function handleDialogClose() {
    onClose();
  }

  return (
    <dialog
      ref={dialogRef}
      className={styles.dialog()}
      aria-labelledby={titleId}
      aria-modal="true"
      onClose={handleDialogClose}
    >
      <div className={styles.backdrop()} onClick={onClose} aria-hidden="true" />
      <div className={cn(styles.panel(), className)} onClick={(event) => event.stopPropagation()}>
        <div className={styles.header()}>
          <h2 id={titleId} className={styles.title()}>
            {title}
          </h2>
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
            className={styles.closeButton()}
            aria-label="Fechar"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>

        <div className={styles.body()}>{children}</div>

        {footer && <div className={styles.footer()}>{footer}</div>}
      </div>
    </dialog>
  );
}
