import { State } from '@shared/types/state'
import { StateCreator } from 'zustand'
import { EscapeRoomSlice } from './escapeRoomSlice'
import { UISlice } from './uiSlice'
import { VenueSlice } from './venueSlice'

export interface PuzzleSlice {
  updatePuzzleConnected: (roomId: string, puzzleId: string, connected: boolean) => void
  updatePuzzleState: (roomId: string, puzzleId: string, newState: State) => void
}

export const createPuzzleSlice: StateCreator<
  UISlice & VenueSlice & EscapeRoomSlice & PuzzleSlice,
  [['zustand/immer', never]],
  [],
  PuzzleSlice
> = (set) => ({
  updatePuzzleConnected: (roomId: string, puzzleId: string, connected: boolean) => {
    set((state) => {
      if (!state.venue) return
      const room = state.venue.escapeRooms.find((r) => r.id === roomId)
      if (!room) return
      const puzzle = room.puzzles.find((p) => p.id === puzzleId)
      if (!puzzle) return
      puzzle.connected = connected
    })
  },
  updatePuzzleState: (roomId: string, puzzleId: string, newState: State) => {
    set((state) => {
      if (!state.venue) return
      const room = state.venue.escapeRooms.find((r) => r.id === roomId)
      if (!room) return
      const puzzle = room.puzzles.find((p) => p.id === puzzleId)
      if (!puzzle) return
      puzzle.state = newState
    })
  }
})
