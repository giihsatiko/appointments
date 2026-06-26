export function splitDateAndTime(isoString: string): { date: Date; time: string } {
  const parsed = new Date(isoString);
  const date = new Date(parsed.getFullYear(), parsed.getMonth(), parsed.getDate());
  const time = `${String(parsed.getHours()).padStart(2, '0')}:${String(parsed.getMinutes()).padStart(2, '0')}`;
  return { date, time };
}
