import { State } from '@shared/types/state'
import { createEventListener } from '../utils/ipc-helpers'
import { Puzzle } from '@shared/types/puzzle'
import { ipcRenderer } from 'electron'

type PuzzleConnectedData = { roomId: string; puzzleId: string; connected: boolean }
type PuzzleStateData = { roomId: string; puzzleId: string; state: State }

export const puzzlesApi = {
  onConnected: (callback: (roomId: string, puzzleId: string, connected: boolean) => void) => {
    return createEventListener<PuzzleConnectedData>(
      'puzzle:connected',
      ({ roomId, puzzleId, connected }) => {
        callback(roomId, puzzleId, connected)
      }
    )
  },
  onState: (callback: (roomId: string, puzzleId: string, state: State) => void) => {
    return createEventListener<PuzzleStateData>('puzzle:state', ({ roomId, puzzleId, state }) => {
      callback(roomId, puzzleId, state)
    })
  },
  setState: (puzzle: Puzzle, newState: State) => {
    ipcRenderer.invoke('puzzles:state', puzzle, newState)
  }
}

export type PuzzlesApi = typeof puzzlesApi
