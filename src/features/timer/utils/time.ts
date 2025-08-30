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
export function formatDuration(totalSeconds: number): string {
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  return [
    hours.toString().padStart(2, "0"),
    minutes.toString().padStart(2, "0"),
    seconds.toString().padStart(2, "0"),
  ].join(":");
}

/**
 * Parses a duration string formatted as "HH:MM:SS" into a duration in seconds.
 *
 * - Accepts 1-2 digits for the hour portion.
 * - Requires minutes and seconds to be exactly 2 digits.
 * - Returns `null` if the input does not match the expected format.
 *
 * @param duration A string in "HH:MM:SS" format.
 * @returns The total number of seconds represented by the string, or `null` if the string is invalid.
 */
export function parseDuration(duration: string): number | null {
  const regex = /^(\d{1,2}):(\d{2}):(\d{2})$/;
  const match = duration.match(regex);

  if (!match) return null;

  const hours = parseInt(match[1], 10) * 3600;
  const minutes = parseInt(match[2], 10) * 60;
  const seconds = parseInt(match[3], 10);

  return hours + minutes + seconds;
}
