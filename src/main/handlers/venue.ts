import { ipcMain } from 'electron'
import { fetchVenue } from '../services/database'

export function registerVenueHandlers(): void {
  ipcMain.handle('venue:fetch', async (_event, venueId: string) => {
    try {
      console.log('Fetching data for venue:', venueId)
      const venue = await fetchVenue(venueId)
      return { success: true, data: venue }
    } catch (error) {
      console.error('Error fetching venue:', error)
      return { success: false, error: error instanceof Error ? error.message : 'Unknown error' }
    }
  })
}
