import { EscapeRoom } from '@shared/types/escape-room'
import { Puzzle } from '@shared/types/puzzle'
import { create } from 'zustand'

interface EscapeRoomStore {
  // State
  escapeRooms: EscapeRoom[] | null
  loading: boolean
  error: string | null
  venueId: string | null

  // Actions
  fetchRooms: (venueId: string) => Promise<void>

  // Update functions for MQTT

  // Selectors
  getEscapeRoom: (roomId: string) => EscapeRoom | undefined
  getPuzzle: (roomId: string, puzzleId: string) => Puzzle | undefined
}

export const useEscapeRoomStore = create<EscapeRoomStore>((set, get) => ({
  // Initial state
  escapeRooms: null,
  loading: false,
  error: null,
  venueId: null,

  // Fetch roosm from supabase
  fetchRooms: async (venueId: string) => {
    set({ loading: true, error: null, venueId })
    try {
      const result = await window.api.escapeRooms.fetch(venueId)

      if (result.success && result.data) {
        set({ escapeRooms: result.data, loading: false })
      } else {
        set({ error: result.error || 'Failed to fetch escape rooms', loading: false })
      }
    } catch (error) {
      set({ error: error instanceof Error ? error.message : 'Unknown error', loading: false })
    }
  },

  // Get a specific escape room
  getEscapeRoom: (roomId: string) => {
    return get().escapeRooms?.find((room) => room.id === roomId)
  },

  // Get a specific puzzle within an escape room
  getPuzzle: (roomId: string, puzzleId: string) => {
    const room = get().getEscapeRoom(roomId)
    return room?.puzzles.find((puzzle) => puzzle.id === puzzleId)
  }
}))
