import { State } from './state'

export interface Timer {
  duration: string // HH:MM:SS format e.g. "01:30:00" for 1 hour 30 minutes

  // Runtime properties
  state: State // Current state of the timer
  connected: boolean // Whether the timer is currently connected or not
  timeRemaining: string // HH:MM:SS format representing the remaining time
}
