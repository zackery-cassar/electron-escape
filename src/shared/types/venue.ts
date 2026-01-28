import { EscapeRoom } from './escape-room'

export interface Venue {
  id: string
  name: string
  escapeRooms: EscapeRoom[]
}
