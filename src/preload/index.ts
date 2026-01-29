import { electronAPI } from '@electron-toolkit/preload'
import { contextBridge } from 'electron'
import { escapeRoomApi } from './api/escape-rooms'
import { timerApi } from './api/timer'
import { venueApi } from './api/venue'
import { puzzlesApi } from './api/puzles'

// Custom APIs for renderer
const api = {
  timer: timerApi,
  escapeRooms: escapeRoomApi,
  venue: venueApi,
  puzzles: puzzlesApi
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
