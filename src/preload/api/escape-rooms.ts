import { ipcRenderer } from 'electron'

export const escapeRoomApi = {
  onClientConnected: (callback: (id: string, connected: boolean) => void) => {
    const listener = (
      _event: Electron.IpcRendererEvent,
      data: { id: string; connected: boolean }
    ): void => {
      callback(data.id, data.connected)
    }
    ipcRenderer.on('client:connected', listener)
    return () => ipcRenderer.removeListener('client:connected', listener)
  }
}

export type EscapeRoomApi = typeof escapeRoomApi
