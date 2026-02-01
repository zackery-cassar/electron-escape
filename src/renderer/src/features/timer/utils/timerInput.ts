export const isColon = (s: string, i: number): boolean => s[i] === ':'

export function previousDigitPosition(s: string, from: number): number {
  let i = from - 1
  while (i >= 0 && isColon(s, i)) i--
  return i
}

export function nextDigitPosition(s: string, from: number): number {
  let i = from
  while (i < s.length && isColon(s, i)) i++
  return i
}

export function replaceValueAtPosition(s: string, index: number, newChar: string): string {
  return s.substring(0, index) + newChar + s.substring(index + 1)
}

export function zeroSelection(s: string, start: number, end: number): string {
  const a = Math.min(start, end)
  const b = Math.max(start, end)
  const array = s.split('')

  for (let i = a; i < b; i++) if (!isColon(s, i)) array[i] = '0'

  return array.join('')
}
