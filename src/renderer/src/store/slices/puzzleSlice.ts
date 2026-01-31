import { State } from '@shared/types/state'
import { StateCreator } from 'zustand'
import { EscapeRoomSlice } from './escapeRoomSlice'
import { UISlice } from './uiSlice'
import { VenueSlice } from './venueSlice'
import { TimerSlice } from './timerSlice'

export interface PuzzleSlice {
  updatePuzzleConnected: (roomId: string, puzzleId: string, connected: boolean) => void
  updatePuzzleState: (roomId: string, puzzleId: string, newState: State) => void
}

export const createPuzzleSlice: StateCreator<
  UISlice & VenueSlice & EscapeRoomSlice & PuzzleSlice & TimerSlice,
  [['zustand/immer', never]],
  [],
  PuzzleSlice
> = (set) => ({
  updatePuzzleConnected: (roomId: string, puzzleId: string, connected: boolean) => {
    set((state) => {
      if (!state.venue) return
      const puzzle = state.venue.rooms[roomId]?.puzzles[puzzleId]
      if (!puzzle) return
      puzzle.connected = connected
    })
  },
  updatePuzzleState: (roomId: string, puzzleId: string, newState: State) => {
    set((state) => {
      if (!state.venue) return
      const puzzle = state.venue.rooms[roomId]?.puzzles[puzzleId]
      if (!puzzle) return
      puzzle.state = newState
    })
  }
})
