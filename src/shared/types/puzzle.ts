import { Hint } from './hint'
import { State } from './state'

export interface Puzzle {
  id: string // Unique identifier for the puzzle
  roomId: string // Which escape room this puzzle belongs to
  name: string // Name of the puzzle
  subtopic: string // MQTT subtopic for the puzzle
  isTech: boolean // Whether the puzzle is a tech puzzle or not
  hints: Hint[] // List of hints associated with the puzzle
  solution?: string // Optional solution for the puzzle

  // Runtime properties
  state: State // Current state of the puzzle
  connected: boolean // Whether the puzzle is currently connected or not
}
