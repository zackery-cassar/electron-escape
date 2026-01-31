import { State } from '@shared/types/state'
import { StateCreator } from 'zustand'
import { UISlice } from './uiSlice'
import { VenueSlice } from './venueSlice'
import { EscapeRoomSlice } from './escapeRoomSlice'
import { PuzzleSlice } from './puzzleSlice'

export interface TimerSlice {
  updateTimerConnected: (roomId: string, connected: boolean) => void
  updateTimerState: (roomId: string, newState: State) => void
  updateTimerData: (roomId: string, data: string) => void
}

export const createTimerSlice: StateCreator<
  TimerSlice & UISlice & VenueSlice & EscapeRoomSlice & PuzzleSlice,
  [['zustand/immer', never]],
  [],
  TimerSlice
> = (set) => ({
  updateTimerConnected: (roomId: string, connected: boolean) => {
    set((state) => {
      if (!state.venue) return
      const timer = state.venue.rooms[roomId]?.timer
      if (!timer) return
      timer.connected = connected
    })
  },
  updateTimerState: (roomId: string, newState: State) => {
    set((state) => {
      if (!state.venue) return
      const timer = state.venue.rooms[roomId]?.timer
      if (!timer) return
      timer.state = newState
    })
  },
  updateTimerData: (roomId: string, data: string) => {
    set((state) => {
      if (!state.venue) return
      const timer = state.venue.rooms[roomId]?.timer
      if (!timer) return
      timer.timeRemaining = data
    })
  }
})
