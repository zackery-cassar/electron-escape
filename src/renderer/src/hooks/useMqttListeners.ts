import { useVenueStore } from '@renderer/store/venueStore'
import { useEffect } from 'react'

export function useMqttListeners(): void {
  useEffect(() => {
    window.api.escapeRooms.onClientConnected((id, connected) => {
      useVenueStore.getState().updateConnected(id, connected)
    })
  }, [])

  useEffect(() => {
    window.api.puzzles.onState((roomId, puzzleId, newState) => {
      useVenueStore.getState().updateState(roomId, puzzleId, newState)
    })
  }, [])
}
