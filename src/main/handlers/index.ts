import { registerEscapeRoomHandlers } from './escape-rooms'
import { registerHintsHandler } from './hints'
import { registerPuzzlesHandler } from './puzzles'
import { registerTimerHandlers } from './timer'
import { registerVenueHandlers } from './venue'

/**
 * Register all IPC handlers
 */
export function registerAllHandlers(): void {
  registerVenueHandlers()
  registerEscapeRoomHandlers()
  registerTimerHandlers()
  registerHintsHandler()
  registerPuzzlesHandler()
  // Add more handler registrations here as you create them
  // Example:
  // registerPuzzleHandlers()
  // registerEscapeRoomHandlers()
}
