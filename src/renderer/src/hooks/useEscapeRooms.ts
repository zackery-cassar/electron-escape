import { useEscapeRoomStore } from '@renderer/store/escapeRoomStore'
import { EscapeRoom } from '@shared/types/escape-room'

export function useEscapeRooms(): EscapeRoom[] | null {
  return useEscapeRoomStore((state) => state.escapeRooms)
}
