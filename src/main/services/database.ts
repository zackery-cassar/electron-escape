import { State } from '@shared/types/state'
import { Venue } from '@shared/types/venue'
import { getSupabase } from './supabase'
import { EscapeRoom } from '@shared/types/escape-room'
import { Puzzle } from '@shared/types/puzzle'

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
    rooms: venue.escape_rooms
      .sort((a, b) => a.order - b.order)
      .reduce<Record<string, EscapeRoom>>((acc, room) => {
        acc[room.id] = {
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
            roomId: room.id,
            state: State.UNKNOWN,
            connected: false,
            timeRemaining: '00:00:00'
          },
          puzzles: (room.puzzles || [])
            .sort((a, b) => a.order - b.order)
            .reduce<Record<string, Puzzle>>((puzzleAcc, puzzle) => {
              puzzleAcc[puzzle.id] = {
                id: puzzle.id,
                roomId: puzzle.escape_room_id,
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
                    sent: false
                  })),
                solution: puzzle.solution || undefined,
                state: State.UNKNOWN,
                connected: false
              }
              return puzzleAcc
            }, {}),
          state: State.UNKNOWN,
          phase: '',
          connected: false,
          currentHint: '',
          hintCounter: 0
        }
        return acc
      }, {})
  }
}
