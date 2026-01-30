import { MqttConfig } from './mqtt-config'
import { Puzzle } from './puzzle'
import { State } from './state'
import { Timer } from './timer'

export interface EscapeRoom {
  id: string // Unique identifier for the escape room
  venueId: string // Which venue this escape room belongs to
  name: string // Name of the escape room
  mqtt: MqttConfig // MQTT configuration for the escape room
  timer: Timer // Timer associated with the escape room
  puzzles: Record<string, Puzzle> // Puzzles associated with the escape room

  // Runtime properties
  state: State // Current state of the escape room
  phase: string // Current phase of the escape room
  connected: boolean // Whether the escape room is currently connected or not

  currentHint: string // The current hint being displayed to the players
  hintCounter: number // Counter for the number of hints sent this session
}
