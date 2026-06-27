import { Calendar, Plus, RefreshCw } from 'lucide-react';
import { lazy, Suspense, useState } from 'react';
import { Button } from '@/components/button';
import { Card } from '@/components/card';
import { EmptyState } from '@/components/empty-state';
import { Skeleton } from '@/components/skeleton';
import { Pagination } from '@/components/pagination';
import { AppointmentsDesktop } from './components/desktop';
import { AppointmentsMobile } from './components/mobile';
import { appointmentsStyles } from './styles';
import { useAppointmentsPage } from './hooks/appointments.hook';
import { useAppointmentModal } from './hooks/use-appointment-modal';
import type { View } from './types';

const AppointmentDetails = lazy(() =>
  import('./components/appointment-details').then((module) => ({
    default: module.AppointmentDetails,
  })),
);

const AppointmentForm = lazy(() =>
  import('./components/appointment-form').then((module) => ({
    default: module.AppointmentForm,
  })),
);

function ModalFallback() {
  return <Skeleton className="mx-auto h-64 w-full max-w-md rounded-xl" />;
}

export function AppointmentsPage() {
  const styles = appointmentsStyles();
  const [view, setView] = useState<View>(null);

  const appointments = useAppointmentsPage();
  const modal = useAppointmentModal(view, appointments);

  function openModal(mode: NonNullable<View>['mode'], id?: string) {
    setView({ mode, id } as View);
  }

  function close() {
    setView(null);
  }

  const isOpen = (mode: NonNullable<View>['mode']) => view?.mode === mode;

  return (
    <main className={styles.container()}>
      <div className={styles.header()}>
        <div className={styles.headerContent()}>
          <h1 className={styles.title()}>Agendamentos</h1>
          <p className={styles.subtitle()}>Gerencie todos os seus agendamentos.</p>
        </div>
        <div className={styles.headerActions()}>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => appointments.refetch()}
            disabled={appointments.isLoading}
            aria-label="Atualizar lista de agendamentos"
            aria-busy={appointments.isLoading || undefined}
          >
            <RefreshCw
              className={`h-4 w-4 ${appointments.isLoading ? 'animate-spin' : ''}`}
              aria-hidden="true"
            />
          </Button>
          <Button onClick={() => openModal('form')}>
            <Plus className="h-4 w-4" /> Novo agendamento
          </Button>
        </div>
      </div>

      {appointments.isError && (
        <Card className={styles.errorCard()} role="alert">
          <p className={styles.errorMessage()}>
            Não foi possível carregar os agendamentos:{' '}
            {appointments.error?.message || 'Erro desconhecido'}
          </p>
          <Button
            variant="danger"
            size="sm"
            className="mt-3"
            onClick={() => appointments.refetch()}
          >
            Tentar novamente
          </Button>
        </Card>
      )}

      {appointments.isLoading ? (
        <div
          className={styles.skeletonContainer()}
          aria-busy="true"
          aria-live="polite"
          role="status"
        >
          <span className="sr-only">Carregando agendamentos…</span>
          {Array.from({ length: 5 }).map((_, i) => (
            <Skeleton key={i} className={styles.skeletonRow()} aria-hidden="true" />
          ))}
        </div>
      ) : !appointments.data || appointments.data.length === 0 ? (
        <EmptyState
          icon={Calendar}
          title="Nenhum agendamento encontrado"
          description="Você ainda não possui nenhum agendamento cadastrado no sistema."
          action={<Button onClick={() => openModal('form')}>Criar meu primeiro agendamento</Button>}
        />
      ) : (
        <>
          <AppointmentsDesktop
            data={appointments.data}
            onOpenModal={openModal}
            onCheckIn={appointments.checkIn}
            onRemove={appointments.remove}
            isCheckingIn={appointments.isCheckingIn}
            checkingInId={appointments.checkingInId}
            isDeleting={appointments.isDeleting}
            deletingId={appointments.deletingId}
          />

          <AppointmentsMobile
            data={appointments.data}
            onOpenModal={openModal}
            onCheckIn={appointments.checkIn}
            onRemove={appointments.remove}
            isCheckingIn={appointments.isCheckingIn}
            checkingInId={appointments.checkingInId}
            isDeleting={appointments.isDeleting}
            deletingId={appointments.deletingId}
          />

          {appointments.totalPages > 1 && (
            <Pagination
              currentPage={appointments.currentPage}
              totalPages={appointments.totalPages}
              onPageChange={appointments.onPageChange}
            />
          )}
        </>
      )}

      <Suspense fallback={isOpen('form') ? <ModalFallback /> : null}>
        <AppointmentForm
          isOpen={isOpen('form')}
          onClose={close}
          editingId={modal.form.editingId}
          appointment={modal.form.appointment}
          isLoadingAppointment={modal.form.isLoadingAppointment}
          onSubmit={(data) => modal.form.submit(data, close)}
          isSubmitting={modal.form.isSubmitting}
        />
      </Suspense>

      <Suspense fallback={isOpen('detail') ? <ModalFallback /> : null}>
        <AppointmentDetails
          isOpen={isOpen('detail')}
          onClose={close}
          viewingId={modal.detail.viewingId}
          appointment={modal.detail.appointment}
          isLoading={modal.detail.isLoading}
          isError={modal.detail.isError}
          onEdit={(id) => openModal('form', id)}
        />
      </Suspense>
    </main>
  );
}
