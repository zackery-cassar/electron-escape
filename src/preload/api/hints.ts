import { ipcRenderer } from 'electron'

export const hintsApi = {
  send: (roomId: string, content: string): void => {
    ipcRenderer.invoke('hints:send', roomId, content)
  }
}

export type HintsApi = typeof hintsApi
