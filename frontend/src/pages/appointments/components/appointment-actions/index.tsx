import { useEffect, useRef, useState } from 'react';
import { Eye, Edit2, Trash2, CheckCircle2 } from 'lucide-react';
import { Button } from '@/components/button';
import { ConfirmModal } from '@/components/confirm-modal';
import { AppointmentStatusEnum } from '@/types/appointments';
import { appointmentActionsStyles } from './styles';
import type { AppointmentActionsProps } from './types';

export function AppointmentActions({
  appointmentId,
  appointmentName,
  status,
  layout,
  onOpenModal,
  onCheckIn,
  onRemove,
  isCheckingIn,
  checkingInId,
  isDeleting,
  deletingId,
}: AppointmentActionsProps) {
  const styles = appointmentActionsStyles({ layout });
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const isDeletingThis = isDeleting && deletingId === appointmentId;
  const wasDeletingRef = useRef(false);

  useEffect(() => {
    if (isDeletingThis) {
      wasDeletingRef.current = true;
    }

    if (isConfirmOpen && wasDeletingRef.current && !isDeleting) {
      wasDeletingRef.current = false;
      setIsConfirmOpen(false);
    }
  }, [isConfirmOpen, isDeleting, isDeletingThis]);

  function handleConfirmRemove() {
    onRemove(appointmentId);
  }

  return (
    <>
      <div className={styles.root()}>
        {status === AppointmentStatusEnum.PENDING && (
          <Button
            variant="ghost"
            size="icon"
            aria-label="Fazer check-in"
            className={styles.actionButtonCheckin()}
            onClick={() => onCheckIn(appointmentId)}
            isLoading={isCheckingIn && checkingInId === appointmentId}
          >
            <CheckCircle2 className={styles.icon()} />
          </Button>
        )}
        <Button
          variant="ghost"
          size="icon"
          aria-label="Visualizar agendamento"
          className={styles.actionButton()}
          onClick={() => onOpenModal('detail', appointmentId)}
        >
          <Eye className={styles.icon()} />
        </Button>
        {status === AppointmentStatusEnum.PENDING && (
          <Button
            variant="ghost"
            size="icon"
            aria-label="Editar agendamento"
            className={styles.actionButton()}
            onClick={() => onOpenModal('form', appointmentId)}
          >
            <Edit2 className={styles.icon()} />
          </Button>
        )}
        <Button
          variant="ghost"
          size="icon"
          aria-label="Excluir agendamento"
          className={styles.actionButtonDelete()}
          onClick={() => setIsConfirmOpen(true)}
          isLoading={isDeletingThis}
        >
          <Trash2 className={styles.icon()} />
        </Button>
      </div>

      <ConfirmModal
        isOpen={isConfirmOpen}
        onClose={() => {
          if (!isDeletingThis) {
            setIsConfirmOpen(false);
          }
        }}
        onConfirm={handleConfirmRemove}
        title="Excluir agendamento?"
        description="Este agendamento será removido permanentemente. Esta ação não pode ser desfeita."
        highlight={appointmentName}
        confirmLabel="Excluir"
        cancelLabel="Cancelar"
        tone="danger"
        isConfirming={isDeletingThis}
      />
    </>
  );
}
