import { z } from 'zod';
import { combineDateAndTime, isValidTimeValue } from '@/utils/datetime';

export const appointmentSchema = z
  .object({
    name: z
      .string()
      .min(1, 'Nome é obrigatório')
      .min(2, 'Nome deve ter pelo menos 2 caracteres')
      .trim()
      .refine((val) => val.trim().length > 0, 'Nome não pode conter apenas espaços')
      .refine((val) => /^[\p{L}\s'-]+$/u.test(val), 'Nome deve conter apenas letras'),
    date: z.date({ message: 'Data é obrigatória' }),
    time: z.string().min(1, 'Hora é obrigatória').refine(isValidTimeValue, 'Hora inválida'),
    location: z
      .string()
      .min(1, 'Local é obrigatório')
      .trim()
      .refine((val) => val.trim().length > 0, 'Local não pode conter apenas espaços'),
  })
  .superRefine((data, ctx) => {
    const combined = combineDateAndTime(data.date, data.time);
    if (combined <= new Date()) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'A data deve ser no futuro',
        path: ['date'],
      });
    }
    const hour = Number(
      new Intl.DateTimeFormat('pt-BR', {
        hour: 'numeric',
        hour12: false,
        timeZone: 'America/Sao_Paulo',
      }).format(combined),
    );
    if (hour < 9 || hour >= 18) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'Agendamentos apenas em horário comercial (09h às 18h, horário de Brasília)',
        path: ['time'],
      });
    }
  });

export type AppointmentFormValues = z.infer<typeof appointmentSchema>;
