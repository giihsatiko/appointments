import { QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from 'sonner';
import { queryClient } from './lib/queryClient';
import { AppointmentsPage } from './pages/appointments';

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AppointmentsPage />
      <Toaster position="bottom-right" richColors closeButton />
    </QueryClientProvider>
  );
}

export default App;
