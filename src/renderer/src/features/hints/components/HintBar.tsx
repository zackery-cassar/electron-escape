import { Lightbulb, Send } from 'lucide-react'
import React, { useState } from 'react'

type HintBarProps = {
  roomId: string
}

export function HintBar({ roomId }: HintBarProps): React.JSX.Element {
  const [hintText, setHintText] = useState('')
  const hasText = hintText.trim().length > 0

  const handleSubmit = (): void => {
    if (!hasText) return

    window.api.hints.send(roomId, hintText)
    setHintText('')
  }

  return (
    <div className="flex items-center gap-2 rounded-full bg-white/5 p-1 backdrop-blur-2xl">
      <Lightbulb className="ml-2 size-5" />

      <input
        type="text"
        value={hintText}
        onChange={(e) => setHintText(e.target.value)}
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
