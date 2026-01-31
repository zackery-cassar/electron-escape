import { StateCreator } from 'zustand'
import { EscapeRoomSlice } from './escapeRoomSlice'
import { VenueSlice } from './venueSlice'
import { PuzzleSlice } from './puzzleSlice'
import { TimerSlice } from './timerSlice'

export interface UISlice {
  // State
  loading: boolean
  error: string | null

  // Actions
  setLoading(isLoading: boolean): void
  setError(error: string | null): void
  clearError(): void
}

export const createUISlice: StateCreator<
  UISlice & VenueSlice & EscapeRoomSlice & PuzzleSlice & TimerSlice,
  [['zustand/immer', never]],
  [],
  UISlice
> = (set) => ({
  // Initial state
  loading: false,
  error: null,

  // Actions
  setLoading: (isLoading: boolean) => {
    set({ loading: isLoading })
  },

  setError: (error: string | null) => {
    set({ error })
  },

  clearError: () => {
    set({ error: null })
  }
})
