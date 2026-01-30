import { useVenueStore } from '@renderer/store/venueStore'
import { useEffect } from 'react'

export function useMqttListeners(): void {
  useEffect(() => {
    window.api.escapeRooms.onClientConnected((id, connected) => {
      useVenueStore.getState().updateRoomConnected(id, connected)
    })
  }, [])

  useEffect(() => {
    window.api.puzzles.onState((roomId, puzzleId, newState) => {
      useVenueStore.getState().updatePuzzleState(roomId, puzzleId, newState)
    })
  }, [])

  useEffect(() => {
    window.api.puzzles.onConnected((roomId, puzzleId, connected) => {
      useVenueStore.getState().updatePuzzleConnected(roomId, puzzleId, connected)
    })
  }, [])
}
