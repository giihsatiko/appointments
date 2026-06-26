import { Calendar, MapPin, Clock } from 'lucide-react';
import { Button } from '@/components/button';
import { EmptyState } from '@/components/empty-state';
import { Modal } from '@/components/modal';
import { formatDate, formatTime, formatDateTime } from '@/utils/formatters';
import { AppointmentStatusEnum } from '@/types/appointment';
import { Skeleton } from '@/components/skeleton';
import { Badge } from '@/components/badge';
import { formatStatus } from '../../utils/format-status';

import type { AppointmentDetailsProps } from './types';
import { appointmentDetailsStyles } from './styles';

export function AppointmentDetails({
  isOpen,
  onClose,
  viewingId,
  onEdit,
  appointment,
  isLoading,
  isError,
}: AppointmentDetailsProps) {
  const styles = appointmentDetailsStyles();

  if (isLoading) {
    return (
      <Modal isOpen={isOpen} onClose={onClose} title="Carregando Detalhes...">
        <div className={styles.loadingSkeleton()}>
          <Skeleton className="h-64 w-full rounded-xl" />
        </div>
      </Modal>
    );
  }

  if (isError || !appointment) {
    return (
      <Modal
        isOpen={isOpen}
        onClose={onClose}
        title="Agendamento não encontrado"
        footer={<Button onClick={onClose}>Voltar para a lista</Button>}
      >
        <EmptyState
          icon={Calendar}
          title="Agendamento não encontrado"
          description="O agendamento que você tentou acessar não existe ou ocorreu um erro."
        />
      </Modal>
    );
  }

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Detalhes do Agendamento"
      className="max-w-2xl"
      footer={
        <>
          <Button variant="ghost" onClick={onClose}>
            Fechar
          </Button>
          {appointment.status === AppointmentStatusEnum.PENDING && (
            <Button onClick={() => onEdit(viewingId!)}>Editar Agendamento</Button>
          )}
        </>
      }
    >
      <div className={styles.body()}>
        <div className={styles.content()}>
          <div className={styles.section()}>
            <p className={styles.label()}>Nome do Paciente / Cliente</p>
            <p className={styles.value()}>{appointment.name}</p>
          </div>

          <div className={styles.grid()}>
            <div className={styles.section()}>
              <div className={styles.label()}>
                <Calendar className="h-4 w-4" /> Data
              </div>
              <p className={styles.valueSmall()}>{formatDate(appointment.date)}</p>
            </div>

            <div className={styles.section()}>
              <div className={styles.label()}>
                <Clock className="h-4 w-4" /> Hora
              </div>
              <p className={styles.valueSmall()}>{formatTime(appointment.date)}</p>
            </div>
          </div>

          <div className={styles.section()}>
            <div className={styles.label()}>
              <MapPin className="h-4 w-4" /> Local
            </div>
            <p className={styles.valueSmall()}>{appointment.location}</p>
          </div>
        </div>

        <div className={styles.sidebar()}>
          <div>
            <p className={styles.statusLabel()}>Status Atual</p>
            <Badge
              variant={
                appointment.status === AppointmentStatusEnum.CHECKED_IN ? 'success' : 'warning'
              }
              className={styles.badge()}
            >
              {formatStatus(appointment.status)}
            </Badge>
          </div>

          <div className={styles.footerRow()}>
            <p className={styles.footerLabel()}>Última atualização</p>
            <p className={styles.footerValue()}>{formatDateTime(appointment.updatedAt)}</p>
          </div>
        </div>
      </div>
    </Modal>
  );
}
