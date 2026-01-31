import { electronAPI } from '@electron-toolkit/preload'
import { contextBridge } from 'electron'
import { escapeRoomApi, timerApi, venueApi, puzzlesApi, hintsApi } from './api'

// Custom APIs for renderer
const api = {
  timer: timerApi,
  escapeRooms: escapeRoomApi,
  venue: venueApi,
  puzzles: puzzlesApi,
  hints: hintsApi
}

// Use `contextBridge` APIs to expose Electron APIs to
// renderer only if context isolation is enabled, otherwise
// just add to the DOM global.
if (process.contextIsolated) {
  try {
    contextBridge.exposeInMainWorld('electron', electronAPI)
    contextBridge.exposeInMainWorld('api', api)
  } catch (error) {
    console.error(error)
  }
} else {
  // @ts-ignore (define in dts)
  window.electron = electronAPI
  // @ts-ignore (define in dts)
  window.api = api
}
