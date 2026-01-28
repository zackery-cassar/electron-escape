export interface Hint {
  id: string // Unique identifier for the hint
  puzzleId: string // Which puzzle this hint belongs to
  title: string // Short description of what the hint is about
  content: string // The actual hint text to be sent to the escape room
  order: number // The order in which the hint should be presented for a particular puzzle

  // Runtime properties
  sent: boolean // Whether the hint has been sent to the escape room or not
}
