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
      venueId: room.venue_id,
      name: room.name,
      mqtt: {
        brokerHost: room.mqtt_brokers?.host || '',
        brokerPort: room.mqtt_brokers?.port || 1883,
        topic: room.topic
      },
      timer: {
        duration: room.duration,
        state: State.UNKNOWN, // Runtime state, not stored in DB
        connected: false, // Runtime state, not stored in DB
        timeRemaining: '00:00:00' // Runtime state, not stored in DB
      },
      puzzles: (room.puzzles || [])
        .sort((a, b) => a.order - b.order)
        .map((puzzle) => ({
          id: puzzle.id,
          escapeRoomId: puzzle.escape_room_id,
          name: puzzle.name,
          subtopic: puzzle.subtopic,
          isTech: puzzle.is_tech,
          hints: (puzzle.hints || [])
            .sort((a, b) => a.order - b.order)
            .map((hint) => ({
              id: hint.id,
              puzzleId: hint.puzzle_id,
              title: hint.title,
              content: hint.content,
              order: hint.order,

              sent: false // Runtime state, not stored in DB
            })),

          state: State.UNKNOWN, // Runtime state, not stored in DB
          connected: false // Runtime state, not stored in DB
        })),

      state: State.UNKNOWN, // Runtime state, not stored in DB
      phase: '', // Runtime state, not stored in DB
      connected: false, // Runtime state, not stored in DB

      currentHint: '', // Runtime state, not stored in DB
      hintCounter: 0 // Runtime state, not stored in DB
    }))
  }
}
