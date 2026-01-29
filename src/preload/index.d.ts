import { ElectronAPI } from '@electron-toolkit/preload'
import './api'

declare global {
  interface Window {
    electron: ElectronAPI
    api: {
      timer: TimerApi
      escapeRooms: EscapeRoomApi
      venue: VenueApi
      puzzles: PuzzlesApi
    }
  }
}
