import { State } from '@shared/types/state'
import { ipcRenderer } from 'electron'
import { createEventListener } from '../utils/ipc-helpers'

type TimerConnectedData = { roomId: string; connected: boolean }
type TimerStateData = { roomId: string; state: State }
type TimerDataData = { roomId: string; data: string }

export const timerApi = {
  reset: (timerId: string): Promise<void> => ipcRenderer.invoke('timer:reset', timerId),
  start: (timerId: string): Promise<void> => ipcRenderer.invoke('timer:start', timerId),
  pause: (timerId: string): Promise<void> => ipcRenderer.invoke('timer:pause', timerId),
  set: (timerId: string, timeRemaining: string): Promise<void> =>
    ipcRenderer.invoke('timer:set', timerId, timeRemaining),
  onConnected: (callback: (roomId: string, connected: boolean) => void) => {
    return createEventListener<TimerConnectedData>('timer:connected', ({ roomId, connected }) => {
      callback(roomId, connected)
    })
  },
  onState: (callback: (roomId: string, state: State) => void) => {
    return createEventListener<TimerStateData>('timer:state', ({ roomId, state }) => {
      callback(roomId, state)
    })
  },
  onData: (callback: (roomId: string, data: string) => void) => {
    return createEventListener<TimerDataData>('timer:data', ({ roomId, data }) => {
      callback(roomId, data)
    })
  }
}

export type TimerApi = typeof timerApi
