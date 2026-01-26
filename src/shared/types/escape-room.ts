import { Puzzle } from './puzzle'
import { State } from './state'

export interface EscapeRoom {
  id: string
  name: string
  connected: boolean
  puzzles: Puzzle[]
  state: State
}
