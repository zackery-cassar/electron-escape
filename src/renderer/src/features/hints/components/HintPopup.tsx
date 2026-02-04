import { cn } from '@renderer/utils/cn'
import React from 'react'

type HintPopupProps = {
  roomId: string
  content: string
}

export function HintPopup({ roomId, content }: HintPopupProps): React.JSX.Element {
  if (!content) return <></>

  const handleClick = (): void => {
    window.api.hints.send(roomId, '')
  }

  return (
    <button
      onClick={handleClick}
      className={cn(
        'mb-2 w-full',
        'animate-in slide-in-from-bottom-5 fade-in',
        'border border-white/20 bg-[#111416]',
        'cursor-pointer rounded-2xl p-4 shadow-lg shadow-black/20',
        'transition-all duration-200 hover:border-white/35 hover:bg-[#1e2225]'
      )}
    >
      <div className="flex flex-col items-center gap-1">
        <p className="text-xs leading-relaxed text-gray-200">{content}</p>
      </div>

      <p className="mt-2 text-center text-[10px] text-gray-500">Click to clear the hint</p>
    </button>
  )
}
