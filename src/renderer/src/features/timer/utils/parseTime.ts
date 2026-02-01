/**
 * Parses a time string formatted as "HH:MM:SS" into a duration in seconds.
 *
 * - Accepts 1-2 digits for the hour portion.
 * - Requires minutes and seconds to be exactly 2 digits.
 * - Returns `null` if the input does not match the expected format.
 *
 * @param time A string in "HH:MM:SS" format.
 * @returns The total number of seconds represented by the string, or `null` if the string is invalid.
 */
export function parseTime(time: string): number {
  const regex = /^(\d{1,2}):(\d{2}):(\d{2})$/
  const match = time.match(regex)

  if (!match) return 0

  const hours = parseInt(match[1], 10) * 3600
  const minutes = parseInt(match[2], 10) * 60
  const seconds = parseInt(match[3], 10)

  return hours + minutes + seconds
}
