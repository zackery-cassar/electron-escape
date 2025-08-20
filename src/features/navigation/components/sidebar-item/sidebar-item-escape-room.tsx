import { CriticalAlert, WarningAlert } from "@/components/ui/alerts"
import { computeFlag } from "@/utils/flags"

type Flag = 'none' | 'warning' | 'critical'

interface SidebarItemEscapeRoomProps {
  name: string
  time?: string
  progress?: number
  color?: string
  manualFlag?: Flag
}

export function SidebarItemEscapeRoom({ name, time = "--:--", progress = 0, color = "oklch(27.9% 0.041 260.031)", manualFlag }: SidebarItemEscapeRoomProps) {
	const flag = manualFlag ?? computeFlag(time, progress)
	
  return (
    <div className="relative py-3 px-4 hover:bg-slate-100 transition-all duration-200 cursor-pointer rounded-lg">
            
			{/* Top Row (Icon + Name + Flag + Timer) */}
			<div className="flex items-center justify-between mb-2">
				{/* Icon (Dot) + Name */}
				<div className="flex items-center gap-2">	
					<div className="w-2 h-2 rounded-full shrink-0 mt-0.5" style={{backgroundColor: color}} />
					<span className="font-medium text-sm text-gray-800">{name}</span>
				</div>

				{/* Flag + Timer */}
				<div className="flex justify-end items-center gap-2">
					{ flag == 'critical' && <CriticalAlert /> }
					{ flag == 'warning' && <WarningAlert /> }

					<span className="text-xs font-mono" style={{color: color}}>{time}</span>
				</div>
			</div>

			{/* Bottom Row (Progress Bar + Progress Percentage) */}
			<div className="flex items-center gap-3">
				{/* Progress bar */}
				<div className="flex-auto bg-gray-200 rounded-full h-1 mt-0.5">
					<div className="h-1 rounded-full transition-all duration-300"
						style={{width: `${progress}%`, backgroundColor: color }} />
				</div>

				{/* Progress Percentage */}
				<div className="text-xs font-mono text-gray-500 w-7 text-center">{progress}%</div>
			</div>

  	</div>
  )
}