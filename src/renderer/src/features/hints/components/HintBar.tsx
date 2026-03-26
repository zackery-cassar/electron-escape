import { Lightbulb, Send } from 'lucide-react'
import React from 'react'
import { useVenueStore } from '@renderer/store/venueStore'

type HintBarProps = {
  roomId: string
}

export function HintBar({ roomId }: HintBarProps): React.JSX.Element {
  const hintText = useVenueStore((state) => state.hintInputText[roomId] || '')
  const setHintInputText = useVenueStore((state) => state.setHintInputText)
  const clearHintInputText = useVenueStore((state) => state.clearHintInputText)

  const hasText = hintText.trim().length > 0

  const handleSubmit = (): void => {
    if (!hasText) return

    window.api.hints.send(roomId, hintText)
    clearHintInputText(roomId)
  }

  return (
    <div className="flex items-center gap-2 rounded-full bg-white/5 p-1 backdrop-blur-2xl">
      <Lightbulb className="ml-2 size-5" />

      <input
        type="text"
        value={hintText}
        onChange={(e) => setHintInputText(roomId, e.target.value)}
        onKeyDown={(e) => e.key === 'Enter' && handleSubmit()}
        placeholder="Write a custom hint here..."
        className="w-full text-[12px] outline-none"
      />

      <button onClick={handleSubmit} disabled={!hasText} className="rounded-full bg-amber-600 p-2">
        <Send className="size-4" />
      </button>
    </div>
  )
}
