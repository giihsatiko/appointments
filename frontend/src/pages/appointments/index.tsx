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
import { useAppointmentFormModal } from './hooks/use-appointment-form-modal';
import { useAppointmentDetailsModal } from './hooks/use-appointment-details-modal';
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

  function openModal(mode: NonNullable<View>['mode'], id?: string) {
    setView({ mode, id } as View);
  }

  function close() {
    setView(null);
  }

  const isOpen = (mode: NonNullable<View>['mode']) => view?.mode === mode;

  const editingId = isOpen('form') ? view?.id : undefined;
  const viewingId = isOpen('detail') ? view?.id : undefined;

  const {
    data,
    isLoading,
    isError,
    error,
    refetch,
    currentPage,
    totalPages,
    onPageChange,
    remove,
    isDeleting,
    deletingId,
    checkIn,
    isCheckingIn,
    checkingInId,
  } = useAppointmentsPage();

  const form = useAppointmentFormModal(editingId, isOpen('form'));
  const details = useAppointmentDetailsModal(viewingId, isOpen('detail'));

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
            onClick={() => refetch()}
            disabled={isLoading}
            aria-label="Atualizar lista de agendamentos"
          >
            <RefreshCw className={`h-4 w-4 ${isLoading ? 'animate-spin' : ''}`} />
          </Button>
          <Button onClick={() => openModal('form')}>
            <Plus className="h-4 w-4" /> Novo Agendamento
          </Button>
        </div>
      </div>

      {isError && (
        <Card className={styles.errorCard()}>
          <div className={styles.errorMessage()}>
            Erro ao carregar agendamentos: {error?.message || 'Erro desconhecido'}
          </div>
          <Button variant="danger" size="sm" className="mt-2" onClick={() => refetch()}>
            Tentar Novamente
          </Button>
        </Card>
      )}

      {isLoading ? (
        <div className={styles.skeletonContainer()}>
          {Array.from({ length: 5 }).map((_, i) => (
            <Skeleton key={i} className={styles.skeletonRow()} />
          ))}
        </div>
      ) : !data || data.length === 0 ? (
        <EmptyState
          icon={Calendar}
          title="Nenhum agendamento encontrado"
          description="Você ainda não possui nenhum agendamento cadastrado no sistema."
          action={<Button onClick={() => openModal('form')}>Criar meu primeiro agendamento</Button>}
        />
      ) : (
        <>
          <AppointmentsDesktop
            data={data}
            onOpenModal={openModal}
            onCheckIn={checkIn}
            onRemove={remove}
            isCheckingIn={isCheckingIn}
            checkingInId={checkingInId}
            isDeleting={isDeleting}
            deletingId={deletingId}
          />

          <AppointmentsMobile
            data={data}
            onOpenModal={openModal}
            onCheckIn={checkIn}
            onRemove={remove}
            isCheckingIn={isCheckingIn}
            checkingInId={checkingInId}
            isDeleting={isDeleting}
            deletingId={deletingId}
          />

          {totalPages > 1 && (
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={onPageChange}
            />
          )}
        </>
      )}

      <Suspense fallback={isOpen('form') ? <ModalFallback /> : null}>
        <AppointmentForm
          isOpen={isOpen('form')}
          onClose={close}
          editingId={editingId}
          appointment={form.appointment}
          isLoadingAppointment={form.isLoadingAppointment}
          onSubmit={(data) => form.submit(data, close)}
          isSubmitting={form.isSubmitting}
        />
      </Suspense>

      <Suspense fallback={isOpen('detail') ? <ModalFallback /> : null}>
        <AppointmentDetails
          isOpen={isOpen('detail')}
          onClose={close}
          viewingId={viewingId}
          appointment={details.appointment}
          isLoading={details.isLoading}
          isError={details.isError}
          onEdit={(id) => openModal('form', id)}
        />
      </Suspense>
    </main>
  );
}
