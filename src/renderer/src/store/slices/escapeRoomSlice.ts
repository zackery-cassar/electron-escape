import { EscapeRoom } from '@shared/types/escape-room'
import { Puzzle } from '@shared/types/puzzle'
import { StateCreator } from 'zustand'
import { VenueSlice } from './venueSlice'
import { PuzzleSlice } from './puzzleSlice'
import { UISlice } from './uiSlice'

export interface EscapeRoomSlice {
  // Selectors
  getEscapeRoom: (roomId: string) => EscapeRoom | undefined
  getPuzzle: (roomId: string, puzzleId: string) => Puzzle | undefined

  updateRoomConnected: (roomId: string, connected: boolean) => void
}

export const createEscapeRoomSlice: StateCreator<
  UISlice & VenueSlice & EscapeRoomSlice & PuzzleSlice,
  [['zustand/immer', never]],
  [],
  EscapeRoomSlice
> = (set, get) => ({
  // Selectors
  getEscapeRoom: (roomId: string) => {
    return get().venue?.escapeRooms.find((room) => room.id === roomId)
  },

  getPuzzle: (roomId: string, puzzleId: string) => {
    const room = get().getEscapeRoom(roomId)
    return room?.puzzles.find((puzzle) => puzzle.id === puzzleId)
  },

  updateRoomConnected: (roomId: string, connected: boolean) => {
    set((state) => {
      if (!state.venue) return state

      return {
        venue: {
          ...state.venue,
          escapeRooms: state.venue.escapeRooms.map((room) =>
            room.id === roomId ? { ...room, connected } : room
          )
        }
      }
    })
  }
})
