import { ipcMain } from 'electron'
import { fetchEscapeRooms } from '../services/database'

export function registerEscapeRoomHandlers(): void {
  ipcMain.handle('escape-rooms:fetch', async (_event, venueId: string) => {
    try {
      console.log('Fetching escape rooms for venue:', venueId)
      const escapeRooms = await fetchEscapeRooms(venueId)
      return { success: true, data: escapeRooms }
    } catch (error) {
      console.error('Error fetching escape rooms:', error)
      return { success: false, error: error instanceof Error ? error.message : 'Unknown error' }
    }
  })
}
