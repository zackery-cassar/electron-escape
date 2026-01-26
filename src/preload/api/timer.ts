import { ipcRenderer } from 'electron'

export const timerApi = {
  reset: (timerId: string): Promise<void> => ipcRenderer.invoke('timer:reset', timerId),
  start: (timerId: string): Promise<void> => ipcRenderer.invoke('timer:start', timerId),
  pause: (timerId: string): Promise<void> => ipcRenderer.invoke('timer:pause', timerId)
}

export type TimerApi = typeof timerApi
