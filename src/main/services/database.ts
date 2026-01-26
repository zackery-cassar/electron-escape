import { EscapeRoom } from '@shared/types/escape-room'
import { getSupabase } from './supabase'
import { State } from '@shared/types/state'

/**
 * Fetch all escape rooms with their puzzles and hints
 */
export async function fetchEscapeRooms(venueId: string): Promise<EscapeRoom[]> {
  const supabase = getSupabase()

  const { data: venue, error } = await supabase
    .from('venues')
    .select('*, escape_rooms(*, mqtt_brokers(*), puzzles(*, hints(*)))')
    .eq('id', venueId)
    .single()

  if (error) {
    console.error('Error fetching escape rooms:', error)
    throw new Error(`Failed to fetch escape rooms: ${error.message}`)
  }

  if (!venue || !venue.escape_rooms) return []

  // Transform database format to application format
  return venue.escape_rooms.map((room) => ({
    id: room.id,
    name: room.name,
    state: State.UNKNOWN, // Runtime state, not stored in DB
    connected: false, // Runtime state, not stored in DB
    puzzles: (room.puzzles || [])
      .sort((a, b) => a.order - b.order)
      .map((puzzle) => ({
        id: puzzle.id,
        name: puzzle.name,
        isTech: puzzle.is_tech,
        state: State.UNKNOWN, // Runtime state, not stored in DB
        connected: false, // Runtime state, not stored in DB
        hints: (puzzle.hints || [])
          .sort((a, b) => a.order - b.order)
          .map((hint) => ({
            id: hint.id,
            title: hint.title,
            content: hint.content,
            order: hint.order
          }))
      }))
  }))
}
