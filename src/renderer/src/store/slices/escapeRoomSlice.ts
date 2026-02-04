import { EscapeRoom } from '@shared/types/escape-room'
import { Puzzle } from '@shared/types/puzzle'
import { StateCreator } from 'zustand'
import { StoreState } from '../venueStore'

export interface EscapeRoomSlice {
  // Selectors
  getEscapeRoom: (roomId: string) => EscapeRoom | undefined
  getPuzzle: (puzzleId: string) => Puzzle | undefined

  updateRoomConnected: (roomId: string, connected: boolean) => void
}

export const createEscapeRoomSlice: StateCreator<
  StoreState,
  [['zustand/immer', never]],
  [],
  EscapeRoomSlice
> = (set, get) => ({
  // Selectors
  getEscapeRoom: (roomId: string) => {
    return get().venue?.rooms[roomId]
  },

  getPuzzle: (puzzleId: string) => {
    const rooms = get().venue?.rooms
    if (!rooms) return undefined

    for (const room of Object.values(rooms)) {
      const puzzle = room.puzzles[puzzleId]
      if (puzzle) return puzzle
    }
    return undefined
  },

  updateRoomConnected: (roomId: string, connected: boolean) => {
    set((state) => {
      if (!state.venue) return state

      return {
        venue: {
          ...state.venue,
          rooms: {
            ...state.venue.rooms,
            [roomId]: {
              ...state.venue.rooms[roomId],
              connected
            }
          }
        }
      }
    })
  }
})
