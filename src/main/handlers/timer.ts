import { State } from '@shared/types/state'
import { ipcMain } from 'electron'
import { mqttManager } from '../services/mqtt'

/**
 * Register all timer-related IPC handlers
 */
export function registerTimerHandlers(): void {
  ipcMain.handle('timer:start', async (_event, roomId: string) => {
    try {
      mqttManager.getClient(roomId)?.publish(`timer/state`, { state: State.ACTIVE }, true)
      return { success: true }
    } catch (error) {
      console.error('Error starting the timer:', error)
      return { success: false, error: error instanceof Error ? error.message : 'Unknown error' }
    }
  })

  ipcMain.handle('timer:pause', async (_event, roomId: string) => {
    try {
      mqttManager.getClient(roomId)?.publish(`timer/state`, { state: State.PAUSED }, true)
      return { success: true }
    } catch (error) {
      console.error('Error pausing the timer:', error)
      return { success: false, error: error instanceof Error ? error.message : 'Unknown error' }
    }
  })

  ipcMain.handle('timer:reset', async (_event, roomId: string) => {
    try {
      mqttManager.getClient(roomId)?.publish(`timer/state`, { state: State.RESETTING }, true)
      return { success: true }
    } catch (error) {
      console.error('Error resetting the timer:', error)
      return { success: false, error: error instanceof Error ? error.message : 'Unknown error' }
    }
  })

  ipcMain.handle('timer:set', async (_event, roomId: string, timeRemaining: string) => {
    try {
      mqttManager.getClient(roomId)?.publish(`timer/data`, { value: timeRemaining }, true)
      return { success: true }
    } catch (error) {
      console.error('Error setting the timer:', error)
      return { success: false, error: error instanceof Error ? error.message : 'Unknown error' }
    }
  })
}
