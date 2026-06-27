import { useEffect, useRef } from 'react';

import { Modal } from '@/components/modal';

import { Button } from '@/components/button';

import { confirmModalStyles } from './styles';

import type { ConfirmModalProps } from './types';

export function ConfirmModal({
  isOpen,
  onClose,
  onConfirm,
  title,
  description,
  highlight,
  confirmLabel = 'Confirmar',
  cancelLabel = 'Cancelar',
  isConfirming = false,
  tone = 'default',
}: ConfirmModalProps) {
  const styles = confirmModalStyles();

  const cancelRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (isOpen) {
      cancelRef.current?.focus();
    }
  }, [isOpen]);

  function handleConfirm() {
    onConfirm();
  }

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={title}
      titleId="confirm-modal-title"
      className="max-w-sm"
      footer={
        <>
          <Button
            ref={cancelRef}
            type="button"
            variant="ghost"
            onClick={onClose}
            disabled={isConfirming}
          >
            {cancelLabel}
          </Button>
          <Button
            type="button"
            variant={tone === 'danger' ? 'danger' : 'primary'}
            onClick={handleConfirm}
            isLoading={isConfirming}
          >
            {confirmLabel}
          </Button>
        </>
      }
    >
      <div className={styles.body()}>
        <p className={styles.description()}>{description}</p>
        {highlight && <p className={styles.highlight()}>{highlight}</p>}
      </div>
    </Modal>
  );
}
