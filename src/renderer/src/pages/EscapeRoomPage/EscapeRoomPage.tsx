import React, { useRef, useState, useLayoutEffect } from 'react'
import { useParams } from 'react-router-dom'
import { EscapeRoomHeader } from './EscapeRoomHeader'
import { PuzzleCard } from '@renderer/features/puzzles/components/PuzzleCard'
import { HintBar } from '@renderer/features/hints/components/HintBar'
import { useEscapeRoom } from '@renderer/store/venueStore'
import { HintPopup } from '@renderer/features/hints/components/HintPopup'
import { Scrollbar } from '@renderer/components/ui/scrollbar'

export function EscapeRoomPage(): React.JSX.Element {
  const { id } = useParams<{ id: string }>()
  const room = useEscapeRoom(id || '')
  const hintBarRef = useRef<HTMLDivElement>(null)
  const [hintBarHeight, setHintBarHeight] = useState(0)

  useLayoutEffect(() => {
    if (!hintBarRef.current) return

    const observer = new ResizeObserver((entries) => {
      for (const entry of entries) {
        setHintBarHeight(entry.contentRect.height)
      }
    })

    observer.observe(hintBarRef.current)
    return () => observer.disconnect()
  }, [])

  if (!room) return <span>Failed to fetch room: {id}</span>

  return (
    <div className="flex h-full flex-col">
      <EscapeRoomHeader room={room} />

      <Scrollbar className="flex flex-col overflow-y-auto">
        <div className="min-h-full">
          {/* Adding 30 to the bottom padding for extra space */}
          <div className="flex flex-col gap-4 p-5" style={{ paddingBottom: hintBarHeight + 30 }}>
            {Object.values(room.puzzles).map((puzzle) => (
              <PuzzleCard key={puzzle.id} puzzle={puzzle} />
            ))}
          </div>

          <div ref={hintBarRef} className="absolute bottom-0 w-full p-4 pt-0">
            <HintPopup roomId={room.id} content={room.currentHint} />
            <HintBar roomId={room.id} />
          </div>
        </div>
      </Scrollbar>
    </div>
  )
}
