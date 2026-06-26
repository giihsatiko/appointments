import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from 'sonner';
import { queryClient } from './lib/queryClient';
import { AppointmentsPage } from './pages/appointments';

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          <Route path="*" element={<AppointmentsPage />} />
        </Routes>
      </BrowserRouter>
      <Toaster position="bottom-right" richColors closeButton />
    </QueryClientProvider>
  );
}

export default App;
