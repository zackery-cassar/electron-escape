import { EscapeRoom } from './escape-room'

export interface Venue {
  id: string
  name: string
  rooms: Record<string, EscapeRoom>
}
