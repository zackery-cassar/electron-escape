/**
 * Converts a duration in seconds into a human-readable string
 * formatted as "HH:MM:SS".
 *
 * - Always pads each unit to 2 digis (e.g. "01:05:09")
 * - Handles hours >= 24 (it does not wrap days).
 *
 * @param totalSeconds The total number of seconds to format.
 * @returns A string in "HH:MM:SS" format.
 */
export function formatSeconds(totalSeconds: number): string {
  const hours = Math.floor(totalSeconds / 3600)
  const minutes = Math.floor((totalSeconds % 3600) / 60)
  const seconds = totalSeconds % 60

  return [
    hours.toString().padStart(2, '0'),
    minutes.toString().padStart(2, '0'),
    seconds.toString().padStart(2, '0')
  ].join(':')
}
