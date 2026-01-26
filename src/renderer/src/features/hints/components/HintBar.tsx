import { Lightbulb, Send } from 'lucide-react'
import React from 'react'

export function HintBar(): React.JSX.Element {
  return (
    <div className="flex items-center gap-2 rounded-full bg-white/5 p-1 backdrop-blur-2xl">
      <Lightbulb className="ml-2 size-5" />

      <input
        type="text"
        placeholder="Write a custom hint here..."
        className="w-full text-[12px] outline-none"
      />

      <button className="rounded-full bg-amber-600 p-2">
        <Send className="size-4" />
      </button>
    </div>
  )
}
