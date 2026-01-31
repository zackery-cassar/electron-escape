import { create } from 'zustand'
import { immer } from 'zustand/middleware/immer'
import { createEscapeRoomSlice, EscapeRoomSlice } from './slices/escapeRoomSlice'
import { createUISlice, UISlice } from './slices/uiSlice'
import { createVenueSlice, VenueSlice } from './slices/venueSlice'
import { Venue } from '@shared/types/venue'
import { EscapeRoom } from '@shared/types/escape-room'
import { createPuzzleSlice, PuzzleSlice } from './slices/puzzleSlice'
import { Puzzle } from '@shared/types/puzzle'

type StoreState = VenueSlice & EscapeRoomSlice & UISlice & PuzzleSlice

export const useVenueStore = create<StoreState>()(
  immer((...a) => ({
    ...createVenueSlice(...a),
    ...createEscapeRoomSlice(...a),
    ...createUISlice(...a),
    ...createPuzzleSlice(...a)
  }))
)

export const useVenue = (): Venue | null => useVenueStore((state) => state.venue)
export const useEscapeRooms = (): Record<string, EscapeRoom> =>
  useVenueStore((state) => state.venue?.rooms || {})
export const useEscapeRoom = (id: string): EscapeRoom | null =>
  useVenueStore((state) => state.getEscapeRoom(id) || null)
export const usePuzzle = (puzzleId: string): Puzzle | null =>
  useVenueStore((state) => state.getPuzzle(puzzleId) || null)
export const useLoading = (): boolean => useVenueStore((state) => state.loading)
export const useFetchVenue = (): ((venueId: string) => Promise<void>) =>
  useVenueStore((state) => state.fetchVenue)
