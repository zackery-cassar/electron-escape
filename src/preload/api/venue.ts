import { Venue } from '@shared/types/venue'
import { ipcRenderer } from 'electron'

export const venueApi = {
  fetch: (venueId: string): Promise<{ success: boolean; data?: Venue; error?: string }> =>
    ipcRenderer.invoke('venue:fetch', venueId)
}

export type VenueApi = typeof venueApi
