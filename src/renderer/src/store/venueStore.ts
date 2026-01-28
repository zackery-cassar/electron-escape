import { create } from 'zustand'
import { createEscapeRoomSlice, EscapeRoomSlice } from './slices/escapeRoomSlice'
import { createUISlice, UISlice } from './slices/uiSlice'
import { createVenueSlice, VenueSlice } from './slices/venueSlice'
import { Venue } from '@shared/types/venue'
import { EscapeRoom } from '@shared/types/escape-room'

type StoreState = VenueSlice & EscapeRoomSlice & UISlice

export const useVenueStore = create<StoreState>()((...a) => ({
  ...createVenueSlice(...a),
  ...createEscapeRoomSlice(...a),
  ...createUISlice(...a)
}))

export const useVenue = (): Venue | null => useVenueStore((state) => state.venue)
export const useEscapeRooms = (): EscapeRoom[] | null =>
  useVenueStore((state) => state.venue?.escapeRooms || null)
export const useEscapeRoom = (id: string): EscapeRoom | null =>
  useVenueStore((state) => state.getEscapeRoom(id) || null)
export const useLoading = (): boolean => useVenueStore((state) => state.loading)
export const useFetchVenue = (): ((venueId: string) => Promise<void>) =>
  useVenueStore((state) => state.fetchVenue)
