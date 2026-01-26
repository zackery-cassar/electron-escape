import { Hint } from './hint'
import { State } from './state'

export interface Puzzle {
  id: string
  name: string
  isTech: boolean
  hints: Hint[]
  state: State
  connected: boolean
}
