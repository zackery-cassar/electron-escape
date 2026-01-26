import { Scrollbar } from '@renderer/components/ui/scrollbar'
import { cn } from '@renderer/utils/cn'
import React from 'react'

type SidebarSectionProps = {
  title: string
  scrollable?: boolean
  children?: React.ReactNode
  className?: string
}

export function SidebarSection({
  title,
  scrollable = false,
  children,
  className
}: SidebarSectionProps): React.JSX.Element {
  return (
    <section className={cn('mt-7.5', className, scrollable && 'min-h-0')}>
      <h3 className="mb-0.5 px-5 text-[10px] font-medium tracking-widest text-white/30 uppercase">
        {title}
      </h3>
      <Scrollbar enabled={scrollable} className="h-full">
        <ul className="flex list-none flex-col gap-1">{children}</ul>
      </Scrollbar>
    </section>
  )
}
