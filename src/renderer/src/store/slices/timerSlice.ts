import { State } from '@shared/types/state'
import { StateCreator } from 'zustand'
import { StoreState } from '../venueStore'

export interface TimerSlice {
  updateTimerConnected: (roomId: string, connected: boolean) => void
  updateTimerState: (roomId: string, newState: State) => void
  updateTimerData: (roomId: string, data: string) => void
}

export const createTimerSlice: StateCreator<
  StoreState,
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
