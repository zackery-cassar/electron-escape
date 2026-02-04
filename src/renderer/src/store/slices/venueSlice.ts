import { Venue } from '@shared/types/venue'
import { StateCreator } from 'zustand'
import { StoreState } from '../venueStore'

export interface VenueSlice {
  // State
  venue: Venue | null

  // Actions
  fetchVenue: (venueId: string) => Promise<void>
}

export const createVenueSlice: StateCreator<
  StoreState,
  [['zustand/immer', never]],
  [],
  VenueSlice
> = (set, get) => ({
  // Initial state
  venue: null,

  // Actions
  fetchVenue: async (venueId: string) => {
    get().setLoading(true)
    get().clearError()

    try {
      const result = await window.api.venue.fetch(venueId)

      if (result.success && result.data) {
        set({ venue: result.data })
        get().setLoading(false)
      } else {
        get().setError(result.error || 'Failed to fetch escape rooms')
        get().setLoading(false)
      }
    } catch (error) {
      get().setError(error instanceof Error ? error.message : 'Unknown error')
      get().setLoading(false)
    }
  }
})
