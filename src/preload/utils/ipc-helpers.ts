import { ipcRenderer } from 'electron'

/**
 * Creates a typed event listener for IPC events
 * @param channel - The IPC channel to listen to
 * @param callback - The callback function to execute when the event is received
 * @returns A cleanup function to remove the listener
 */
export function createEventListener<T>(channel: string, callback: (data: T) => void): () => void {
  const listener = (_event: Electron.IpcRendererEvent, data: T): void => {
    callback(data)
  }
  ipcRenderer.on(channel, listener)

  // Return cleanup function
  return () => ipcRenderer.removeListener(channel, listener)
}
