import { EscapeRoom } from '@shared/types/escape-room'
import { ipcRenderer } from 'electron'

export const escapeRoomApi = {
  fetch: (venueId: string): Promise<{ success: boolean; data?: EscapeRoom[]; error?: string }> =>
    ipcRenderer.invoke('escape-rooms:fetch', venueId)
}

export type EscapeRoomApi = typeof escapeRoomApi
