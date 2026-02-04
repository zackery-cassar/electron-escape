import { useVenueStore } from '@renderer/store/venueStore'
import { useEffect } from 'react'

export function useMqttListeners(): void {
  // Escape Rooms
  useEffect(() => {
    window.api.escapeRooms.onClientConnected((id, connected) => {
      useVenueStore.getState().updateRoomConnected(id, connected)
    })
  }, [])

  // Puzzles
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

  // Timers
  useEffect(() => {
    window.api.timer.onState((roomId, newState) => {
      useVenueStore.getState().updateTimerState(roomId, newState)
    })
  }, [])
  useEffect(() => {
    window.api.timer.onConnected((roomId, connected) => {
      useVenueStore.getState().updateTimerConnected(roomId, connected)
    })
  }, [])
  useEffect(() => {
    window.api.timer.onData((roomId, data) => {
      useVenueStore.getState().updateTimerData(roomId, data)
    })
  }, [])

  // Hints
  useEffect(() => {
    window.api.hints.onData((roomId, data) => {
      useVenueStore.getState().updateCurrentHint(roomId, data)
    })
  }, [])

  useEffect(() => {
    window.api.hints.onCounter((roomId, counter) => {
      useVenueStore.getState().updateHintCounter(roomId, counter)
    })
  }, [])
}
