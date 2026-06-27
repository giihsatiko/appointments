import { Calendar, Clock, MapPin } from 'lucide-react';
import { AppointmentStatus } from '@/types/appointments';
import { AppointmentActions } from '@/pages/appointments/components/appointment-actions';
import { appointmentsMobileStyles } from './styles';
import type { AppointmentsMobileProps } from './types';
import { Card } from '@/components/card';
import { Badge } from '@/components/badge';
import { formatDate, formatTime } from '@/utils/formatters';
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
                appointment.status === AppointmentStatus.CHECKED_IN ? 'success' : 'warning'
              }
            >
              {formatStatus(appointment.status)}
            </Badge>
          </div>

          <dl className={styles.meta()}>
            <div className={styles.metaItem()}>
              <dt className={styles.metaLabel()}>
                <Calendar className={styles.metaIcon()} aria-hidden="true" />
                Data
              </dt>
              <dd className={styles.metaValue()}>{formatDate(appointment.date)}</dd>
            </div>
            <div className={styles.metaItem()}>
              <dt className={styles.metaLabel()}>
                <Clock className={styles.metaIcon()} aria-hidden="true" />
                Hora
              </dt>
              <dd className={styles.metaValue()}>{formatTime(appointment.date)}</dd>
            </div>
            <div className={styles.metaItem()}>
              <dt className={styles.metaLabel()}>
                <MapPin className={styles.metaIcon()} aria-hidden="true" />
                Local
              </dt>
              <dd className={styles.metaValue()}>{appointment.location}</dd>
            </div>
          </dl>

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
