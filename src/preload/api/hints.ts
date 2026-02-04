import { ipcRenderer } from 'electron'
import { createEventListener } from '../utils/ipc-helpers'

type HintDataData = { roomId: string; data: string }
type HintCounterData = { roomId: string; counter: number }

export const hintsApi = {
  send: (roomId: string, content: string): void => {
    ipcRenderer.invoke('hints:send', roomId, content)
  },
  onData: (callback: (roomId: string, data: string) => void) => {
    return createEventListener<HintDataData>('hint:data', ({ roomId, data }) => {
      callback(roomId, data)
    })
  },
  onCounter: (callback: (roomId: string, counter: number) => void) => {
    return createEventListener<HintCounterData>('hint:counter', ({ roomId, counter }) => {
      callback(roomId, counter)
    })
  }
}

export type HintsApi = typeof hintsApi
