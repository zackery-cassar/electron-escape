import React from 'react'
import { useParams } from 'react-router-dom'
import { EscapeRoomHeader } from './EscapeRoomHeader'
import { PuzzleCard } from '@renderer/features/puzzles/components/PuzzleCard'
import { HintBar } from '@renderer/features/hints/components/HintBar'
import { useEscapeRoom } from '@renderer/store/venueStore'

export function EscapeRoomPage(): React.JSX.Element {
  const { id } = useParams<{ id: string }>()
  const room = useEscapeRoom(id || '')

  if (!room) return <span>Failed to fetch room: {id}</span>

  return (
    <div className="flex h-full flex-col">
      <EscapeRoomHeader room={room} />

      <div className="flex flex-1 flex-col overflow-y-auto">
        <div className="flex flex-1 flex-col gap-4 p-5">
          {Object.values(room.puzzles).map((puzzle) => (
            <PuzzleCard key={puzzle.id} puzzle={puzzle} />
          ))}
        </div>

        <div className="sticky bottom-0 p-4 pt-0">
          <HintBar />
        </div>
      </div>
    </div>
  )
}
