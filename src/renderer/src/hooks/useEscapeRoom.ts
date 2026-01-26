import { useEscapeRoomStore } from '@renderer/store/escapeRoomStore'
import { EscapeRoom } from '@shared/types/escape-room'

export function useEscapeRoom(id: string): EscapeRoom | null {
  return useEscapeRoomStore((state) => state.getEscapeRoom(id) || null)
}
