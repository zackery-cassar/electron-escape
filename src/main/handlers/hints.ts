import { ipcMain } from 'electron'
import { mqttManager } from '../services/mqtt'

export function registerHintsHandler(): void {
  ipcMain.handle('hints:send', (_event, roomId: string, content: string) => {
    try {
      mqttManager.getClient(roomId)?.publish(`hint/data`, { value: content }, true)
      return { success: true }
    } catch (error) {
      console.error('Error sending hint:', error)
      return { success: false, error: error instanceof Error ? error.message : 'Unknown error' }
    }
  })
}
