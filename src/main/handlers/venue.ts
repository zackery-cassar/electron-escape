import { BrowserWindow, ipcMain } from 'electron'
import { fetchVenue } from '../services/database'
import { EscapeRoomClient } from '../services/mqtt'
import { mqttManager } from '../services/mqtt/mqtt-manager'

export function registerVenueHandlers(): void {
  ipcMain.handle('venue:fetch', async (_event, venueId: string) => {
    const mainWindow = BrowserWindow.getAllWindows()[0]
    const webContents = mainWindow.webContents

    try {
      console.log('Fetching data for venue:', venueId)
      const venue = await fetchVenue(venueId)

      // Initialize MQTT clients for all escape rooms in the venue
      if (venue) {
        venue.escapeRooms.forEach(async (room) => {
          const newClient = new EscapeRoomClient(room.id, room.mqtt, webContents, room)
          await mqttManager.addClient(room.id, newClient)
        })
      }

      return { success: true, data: venue }
    } catch (error) {
      console.error('Error fetching venue:', error)
      return { success: false, error: error instanceof Error ? error.message : 'Unknown error' }
    }
  })
}
