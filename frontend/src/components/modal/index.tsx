import { X } from 'lucide-react';
import * as Dialog from '@radix-ui/react-dialog';
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
  const styles = modalStyles();

  return (
    <Dialog.Root open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <Dialog.Portal>
        <Dialog.Overlay className={styles.overlay()} />
        <Dialog.Content className={cn(styles.panel(), className)} aria-labelledby={titleId}>
          <div className={styles.header()}>
            <Dialog.Title id={titleId} className={styles.title()}>
              {title}
            </Dialog.Title>
            <Dialog.Close asChild>
              <Button
                variant="ghost"
                size="icon"
                className={styles.closeButton()}
                aria-label="Fechar"
              >
                <X className="h-4 w-4" />
              </Button>
            </Dialog.Close>
          </div>

          <div className={styles.body()}>{children}</div>

          {footer && <div className={styles.footer()}>{footer}</div>}
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
