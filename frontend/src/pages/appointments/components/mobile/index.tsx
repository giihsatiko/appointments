import { AppointmentStatusEnum } from '@/types/appointment';

import { AppointmentActions } from '@/pages/appointments/components/appointment-actions';

import { appointmentsMobileStyles } from './styles';

import type { AppointmentsMobileProps } from './types';
import { Card } from '@/components/card';
import { Badge } from '@/components/badge';
import { formatStatus } from '../../utils/format-status';

export function AppointmentsMobile({
  data,
  onOpenModal,
  onCheckIn,
  onRemove,
  isCheckingIn,
  checkingInId,
  isDeleting,
  deletingId,
}: AppointmentsMobileProps) {
  const styles = appointmentsMobileStyles();

  return (
    <div className={styles.root()}>
      {data.map((appointment) => (
        <Card key={appointment.id} className={styles.card()}>
          <div className={styles.cardRow()}>
            <span className={styles.name()}>{appointment.name}</span>

            <Badge
              variant={
                appointment.status === AppointmentStatusEnum.CHECKED_IN ? 'success' : 'warning'
              }
            >
              {formatStatus(appointment.status)}
            </Badge>
          </div>

          <AppointmentActions
            appointmentId={appointment.id}
            appointmentName={appointment.name}
            status={appointment.status}
            layout="mobile"
            onOpenModal={onOpenModal}
            onCheckIn={onCheckIn}
            onRemove={onRemove}
            isCheckingIn={isCheckingIn}
            checkingInId={checkingInId}
            isDeleting={isDeleting}
            deletingId={deletingId}
          />
        </Card>
      ))}
    </div>
  );
}
