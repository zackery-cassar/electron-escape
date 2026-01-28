import { EscapeRoom } from '@shared/types/escape-room'
import { Puzzle } from '@shared/types/puzzle'
import { StateCreator } from 'zustand'
import { VenueSlice } from './venueSlice'

export interface EscapeRoomSlice {
  // Selectors
  getEscapeRoom: (roomId: string) => EscapeRoom | undefined
  getPuzzle: (roomId: string, puzzleId: string) => Puzzle | undefined
}

export const createEscapeRoomSlice: StateCreator<
  EscapeRoomSlice & VenueSlice,
  [],
  [],
  EscapeRoomSlice
> = (_set, get) => ({
  // Selectors
  getEscapeRoom: (roomId: string) => {
    return get().venue?.escapeRooms.find((room) => room.id === roomId)
  },

  getPuzzle: (roomId: string, puzzleId: string) => {
    const room = get().getEscapeRoom(roomId)
    return room?.puzzles.find((puzzle) => puzzle.id === puzzleId)
  }
})
