import { StateCreator } from 'zustand'
import { EscapeRoomSlice } from './escapeRoomSlice'
import { PuzzleSlice } from './puzzleSlice'
import { TimerSlice } from './timerSlice'
import { UISlice } from './uiSlice'
import { VenueSlice } from './venueSlice'

export interface HintSlice {
  updateHintCounter: (roomId: string, counter: number) => void
  updateCurrentHint: (roomId: string, newHint: string) => void
}

export const createHintSlice: StateCreator<
  HintSlice & UISlice & VenueSlice & EscapeRoomSlice & PuzzleSlice & TimerSlice,
  [['zustand/immer', never]],
  [],
  HintSlice
> = (set) => ({
  updateHintCounter: (roomId: string, counter: number) => {
    set((state) => {
      if (!state.venue) return
      const room = state.venue.rooms[roomId]
      if (!room) return
      room.hintCounter = counter
    })
  },
  updateCurrentHint: (roomId: string, newHint: string) => {
    set((state) => {
      if (!state.venue) return
      const room = state.venue.rooms[roomId]
      if (!room) return
      room.currentHint = newHint
    })
  }
})
