import { appointmentsApi } from "@/api/appointments";
import { useQuery } from "@tanstack/react-query";

export function useAppointmentPoll(id?: string, enabled = true) {
    return useQuery({
      queryKey: ['appointment', id],
      queryFn: () => appointmentsApi.poll(id!),
      enabled: !!id && enabled,
      refetchInterval: 10_000,
    });
}