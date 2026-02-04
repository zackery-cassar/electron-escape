import { State } from '@shared/types/state'
import { StateCreator } from 'zustand'
import { StoreState } from '../venueStore'

export interface PuzzleSlice {
  updatePuzzleConnected: (roomId: string, puzzleId: string, connected: boolean) => void
  updatePuzzleState: (roomId: string, puzzleId: string, newState: State) => void
}

export const createPuzzleSlice: StateCreator<
  StoreState,
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
