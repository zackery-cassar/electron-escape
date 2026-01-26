import { ColorDot } from '@renderer/components/ui/indicators'
import React from 'react'

type Size = 'small' | 'medium'

type ConnectionStatusProps = {
  connected: boolean
  size?: Size
}

export function ConnectionStatus({
  connected,
  size = 'medium'
}: ConnectionStatusProps): React.JSX.Element {
  const color = connected ? '#1BBC20' : '#BC1B1B'
  const statusText = connected ? 'Connected' : 'Disconnected'
  const dotSize = size === 'small' ? 6 : 12
  const textSize = size === 'small' ? 'text-[9px]' : 'text-[14px]'

  return (
    <div className="flex items-center gap-1">
      <ColorDot color={color} size={dotSize} style={{ filter: `drop-shadow(0 0 8px ${color})` }} />
      <span className={textSize} style={{ color, textShadow: `0 0 8px ${color}` }}>
        {statusText}
      </span>
    </div>
  )
}
