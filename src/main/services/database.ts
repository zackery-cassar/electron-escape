import { State } from '@shared/types/state'
import { Venue } from '@shared/types/venue'
import { getSupabase } from './supabase'

/**
 * Fetch venue from the database.
 */
export async function fetchVenue(venueId: string): Promise<Venue | null> {
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

  if (!venue) return null

  // Transform database format to application format
  return {
    id: venue.id,
    name: venue.name,
    escapeRooms: venue.escape_rooms.map((room) => ({
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
}
