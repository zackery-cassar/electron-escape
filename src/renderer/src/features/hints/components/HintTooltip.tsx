import { Tooltip } from 'radix-ui'

type HintTooltipProps = {
  content: string
  children: React.JSX.Element
}

export function HintTooltip({ content, children }: HintTooltipProps): React.JSX.Element {
  return (
    <Tooltip.Root delayDuration={300}>
      <Tooltip.Trigger asChild>{children}</Tooltip.Trigger>
      <Tooltip.Portal>
        <Tooltip.Content
          side="bottom"
          align="start"
          sideOffset={5}
          className="flex max-w-xs flex-col gap-2 rounded-lg border border-[white]/15 bg-[#1D2022] px-3 py-2 text-[12px] text-white"
        >
          {content}
          <span className="text-[10px] text-slate-400">Click to send...</span>
          <Tooltip.Arrow className="fill-white/15" />
        </Tooltip.Content>
      </Tooltip.Portal>
    </Tooltip.Root>
  )
}
