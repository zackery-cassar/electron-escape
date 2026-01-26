import { State } from './state'

export interface Timer {
  id: string
  duration: string // HH:MM:SS format e.g. "01:30:00" for 1 hour 30 minutes
  state: State
  connected: boolean
}
