import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/table';

import { formatDate, formatTime } from '@/utils/formatters';

import { AppointmentStatus } from '@/types/appointments';

import { Badge } from '@/components/badge';

import { AppointmentActions } from '@/pages/appointments/components/appointment-actions';

import { appointmentsDesktopStyles } from './styles';

import type { AppointmentsDesktopProps } from './types';
import { formatStatus } from '../../utils/format-status';

const columns = ['Nome', 'Status', 'Data', 'Hora', 'Local', 'Ações'];

export function AppointmentsDesktop({
  data,
  onOpenModal,
  onCheckIn,
  onRemove,
  isCheckingIn,
  checkingInId,
  isDeleting,
  deletingId,
}: AppointmentsDesktopProps) {
  const styles = appointmentsDesktopStyles();

  return (
    <div className={styles.root()}>
      <Table>
        <caption className="sr-only">Lista de agendamentos</caption>
        <TableHeader>
          <TableRow>
            {columns.map((col) => (
              <TableHead
                key={col}
                scope="col"
                className={col === 'Ações' ? styles.tableHeadRight() : undefined}
              >
                {col}
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>

        <TableBody>
          {data.map((appointment) => (
            <TableRow key={appointment.id}>
              <TableCell className={styles.cellName()}>{appointment.name}</TableCell>
              <TableCell>
                <Badge
                  variant={
                    appointment.status === AppointmentStatus.CHECKED_IN ? 'success' : 'warning'
                  }
                >
                  {formatStatus(appointment.status)}
                </Badge>
              </TableCell>
              <TableCell className={styles.tableCellMuted()}>
                {formatDate(appointment.date)}
              </TableCell>
              <TableCell className={styles.tableCellMuted()}>
                {formatTime(appointment.date)}
              </TableCell>
              <TableCell className={styles.tableCellMuted()}>{appointment.location}</TableCell>
              <TableCell className={styles.tableCellRight()}>
                <AppointmentActions
                  appointmentId={appointment.id}
                  appointmentName={appointment.name}
                  status={appointment.status}
                  layout="desktop"
                  onOpenModal={onOpenModal}
                  onCheckIn={onCheckIn}
                  onRemove={onRemove}
                  isCheckingIn={isCheckingIn}
                  checkingInId={checkingInId}
                  isDeleting={isDeleting}
                  deletingId={deletingId}
                />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
