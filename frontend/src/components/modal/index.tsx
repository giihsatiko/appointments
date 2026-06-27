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

    if (isOpen) {
      dialog.showModal();
    } else if (dialog.open) {
      dialog.close();
    }
  }, [isOpen]);

  return (
    <dialog
      ref={dialogRef}
      className={styles.dialog()}
      aria-labelledby={titleId}
      onClose={onClose}
    >
      <div className={cn(styles.panel(), className)}>
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