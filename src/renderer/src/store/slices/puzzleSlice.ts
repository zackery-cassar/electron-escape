import { StateCreator } from 'zustand'
import { VenueSlice } from './venueSlice'
import { State } from '@shared/types/state'

export interface PuzzleSlice {
  updateState: (roomId: string, puzzleId: string, newState: State) => void
}

export const createPuzzleSlice: StateCreator<PuzzleSlice & VenueSlice, [], [], PuzzleSlice> = (
  set
) => ({
  updateState: (roomId: string, puzzleId: string, newState: State) => {
    set((state) => {
      if (!state.venue) return state

      return {
        venue: {
          ...state.venue,
          escapeRooms: state.venue.escapeRooms.map((room) =>
            room.id === roomId
              ? {
                  ...room,
                  puzzles: room.puzzles.map((puzzle) =>
                    puzzle.id === puzzleId ? { ...puzzle, state: newState } : puzzle
                  )
                }
              : room
          )
        }
      }
    })
  }
})
