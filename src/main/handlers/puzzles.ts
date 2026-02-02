import { State } from '@shared/types/state'
import { mqttManager } from '../services/mqtt'
import { ipcMain } from 'electron'
import { Puzzle } from '@shared/types/puzzle'

export function registerPuzzlesHandler(): void {
  ipcMain.handle('puzzles:state', (_event, puzzle: Puzzle, newState: State) => {
    try {
      mqttManager
        .getClient(puzzle.roomId)
        ?.publish(`${puzzle.subtopic}/state`, { state: newState }, true)
      return { success: true }
    } catch (error) {
      console.error('Error updating puzzle state:', error)
      return { success: false, error: error instanceof Error ? error.message : 'Unknown error' }
    }
  })
}
