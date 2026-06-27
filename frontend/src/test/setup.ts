import '@testing-library/jest-dom/vitest';
import { vi } from 'vitest';

vi.mock('socket.io-client', () => {
  const socket = {
    connected: false,
    connect: vi.fn(),
    on: vi.fn(),
    off: vi.fn(),
    emit: vi.fn(),
  };

  return {
    io: vi.fn(() => socket),
  };
});
