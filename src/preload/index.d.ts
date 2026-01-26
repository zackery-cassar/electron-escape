import { ElectronAPI } from '@electron-toolkit/preload'
import { TimerApi } from './api/timer'
import { EscapeRoomApi } from './api/escape-rooms'

declare global {
  interface Window {
    electron: ElectronAPI
    api: {
      timer: TimerApi
      escapeRooms: EscapeRoomApi
    }
  }
}
