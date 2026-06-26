export function maskTimeInput(raw: string): string {
  const digits = raw.replace(/\D/g, '').slice(0, 4);

  if (digits.length <= 2) {
    return digits;
  }

  return `${digits.slice(0, 2)}:${digits.slice(2)}`;
}

export function normalizeTimeInput(value: string): string {
  const trimmed = value.trim();

  if (!trimmed) {
    return '';
  }

  if (/^\d{2}:\d{2}$/.test(trimmed)) {
    return trimmed;
  }

  const digits = trimmed.replace(/\D/g, '');

  if (!digits) {
    return '';
  }

  if (digits.length <= 2) {
    return `${digits.padStart(2, '0')}:00`;
  }

  const hour = digits.slice(0, 2);
  const minute = digits.slice(2, 4).padEnd(2, '0');

  return `${hour}:${minute}`;
}
