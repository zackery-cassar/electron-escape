import { State } from '@shared/types/state'
import { ipcRenderer } from 'electron'

export const puzzlesApi = {
  onState: (callback: (roomId: string, puzzleId: string, state: State) => void) => {
    const listener = (
      _event: Electron.IpcRendererEvent,
      data: { roomId: string; puzzleId: string; state: State }
    ): void => {
      callback(data.roomId, data.puzzleId, data.state)
    }

    ipcRenderer.on('puzzle:state', listener)
    return () => ipcRenderer.removeListener('puzzle:state', listener)
  }
}

export type PuzzlesApi = typeof puzzlesApi
