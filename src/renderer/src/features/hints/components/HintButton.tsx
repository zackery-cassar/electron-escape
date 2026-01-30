import { Hint } from '@shared/types/hint'
import React from 'react'
import { HintTooltip } from './HintTooltip'

type HintProps = {
  hint: Hint
}

export function HintButton({ hint }: HintProps): React.JSX.Element {
  return (
    <HintTooltip content={hint.content}>
      <button className="cursor-pointer rounded-lg border border-white px-2 py-1 text-[12px]">
        <div className="flex gap-2">
          <div className="size-4 items-center justify-center rounded-full bg-white text-black/50">
            {hint.order + 1}
          </div>
          {hint.title}
        </div>
      </button>
    </HintTooltip>
  )
}
