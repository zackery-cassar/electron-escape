import { cn } from '@renderer/utils/cn'
import { ScrollArea } from 'radix-ui'
import React from 'react'

type ScrollbarProps = {
  children?: React.ReactNode
  className?: string
  enabled?: boolean
}

export function Scrollbar({
  enabled = true,
  children,
  className
}: ScrollbarProps): React.JSX.Element {
  if (!enabled) return <>{children}</>

  return (
    <ScrollArea.Root className={cn('flex min-h-0', className)}>
      <ScrollArea.Viewport className="h-full w-full">{children}</ScrollArea.Viewport>
      <ScrollArea.Scrollbar
        forceMount
        className="flex touch-none p-0.5 transition-opacity duration-300 ease-out select-none data-[state=hidden]:opacity-0 data-[state=visible]:opacity-100"
        orientation="vertical"
      >
        <ScrollArea.Thumb
          className="flex-1 rounded-full bg-white/20 transition-colors duration-150 ease-out"
          style={{ width: 3, marginRight: 1 }}
        />
      </ScrollArea.Scrollbar>
    </ScrollArea.Root>
  )
}
