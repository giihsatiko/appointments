import { useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  appointmentSchema,
  type AppointmentFormValues,
} from '@/pages/appointments/components/appointment-form/schemas/appointment';
import { Button } from '@/components/button';
import { Input } from '@/components/input';
import { Modal } from '@/components/modal';
import { Skeleton } from '@/components/skeleton';
import { DatePicker } from '@/components/date-picker';
import { TimeInput } from '@/components/time-input';
import { splitDateAndTime } from '@/pages/appointments/utils/split-date-and-time';

import type { AppointmentFormProps } from './types';
import { appointmentFormStyles } from './styles';

export function AppointmentForm({
  isOpen,
  onClose,
  editingId,
  appointment,
  isLoadingAppointment,
  onSubmit,
  isSubmitting,
}: AppointmentFormProps) {
  const isEditing = !!editingId;
  const styles = appointmentFormStyles();

  const form = useForm<AppointmentFormValues>({
    resolver: zodResolver(appointmentSchema),
    defaultValues: { name: '', time: '', location: '' },
  });

  const {
    register,
    control,
    handleSubmit,
    reset,
    formState: { errors, isDirty },
  } = form;

  useEffect(() => {
    if (appointment && isEditing) {
      const { date, time } = splitDateAndTime(appointment.date);
      reset({ name: appointment.name, date, time, location: appointment.location });
    } else if (!isEditing) {
      reset({ name: '', time: '', location: '' });
    }
  }, [appointment, isEditing, isOpen, reset]);

  const handleFormSubmit = (data: AppointmentFormValues) => {
    onSubmit(data);
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={isEditing ? 'Editar Agendamento' : 'Novo Agendamento'}
      className="max-w-md"
      footer={
        <>
          <Button type="button" variant="ghost" onClick={onClose} disabled={isSubmitting}>
            Cancelar
          </Button>
          <Button
            type="submit"
            isLoading={isSubmitting}
            form="appointment-form"
            disabled={isSubmitting || (isEditing && !isDirty)}
          >
            {isEditing ? 'Salvar Alterações' : 'Criar Agendamento'}
          </Button>
        </>
      }
    >
      {isEditing && isLoadingAppointment ? (
        <Skeleton className="h-64 w-full rounded-xl" />
      ) : (
        <form
          id="appointment-form"
          onSubmit={handleSubmit(handleFormSubmit)}
          className={styles.form()}
        >
          <Input
            label="Nome Completo"
            id="name"
            placeholder="Ex: João da Silva"
            required
            {...register('name')}
            error={errors.name?.message}
          />

          <div className={styles.scheduleRow()}>
            <Controller
              control={control}
              name="date"
              render={({ field }) => (
                <DatePicker
                  label="Data"
                  id="date"
                  required
                  selected={field.value ?? null}
                  onChange={field.onChange}
                  placeholderText="dd/mm/aaaa"
                  error={errors.date?.message}
                />
              )}
            />

            <Controller
              control={control}
              name="time"
              render={({ field }) => (
                <TimeInput
                  label="Hora"
                  id="time"
                  required
                  value={field.value}
                  onChange={field.onChange}
                  onBlur={field.onBlur}
                  error={errors.time?.message}
                />
              )}
            />
          </div>

          <Input
            label="Local"
            id="location"
            placeholder="Ex: Consultório 01"
            required
            {...register('location')}
            error={errors.location?.message}
          />
        </form>
      )}
    </Modal>
  );
}
