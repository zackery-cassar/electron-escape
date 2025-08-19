export function parseTimeToSeconds(time: string): number {
  // Supports "mm:ss" and "hh:mm:ss" format

  const parts = time.split(":").map(Number);

  if (parts.length === 2) {
    const [m, s] = parts;
    return (m || 0) * 60 + (s || 0);
  }

  if (parts.length === 3) {
    const [h, m, s] = parts;
    return (h || 0) * 3600 + (m || 0) * 60 + (s || 0);
  }

  return Number(time) || 0;
}
