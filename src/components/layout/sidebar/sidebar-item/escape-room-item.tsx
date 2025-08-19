import { AlertTriangle, CircleAlert } from "lucide-react";
import { computeFlag } from "../../../../utils/flags";

type Flag = 'none' | 'warning' | 'critical'

interface EscapeRoomItemProps {
    name: string
    time: string;
    progress: number
    statusColor: string;
    manualFlag?: Flag;
}

export default function EscapeRoomItem({ name, time, progress, statusColor, manualFlag }: EscapeRoomItemProps) {
    const flag = manualFlag ?? computeFlag(time, progress);

    return (
        <>
            <div className="relative py-3 px-4 hover:bg-slate-100 transition-all duration-200 cursor-pointer rounded-lg">

                {/* Top Row (Icon / Name / Warning Icon / Time Remaining) */}
                <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                        <div 
                            className={`w-2 h-2 rounded-full shrink-0 mt-0.5`}
                            style={{backgroundColor: statusColor}}/>

                        <span className="font-medium text-sm text-gray-800">{name}</span>
                    </div>

                    <div className="flex justify-end items-center gap-2">
                        <span>
                            {flag === 'critical' && <CircleAlert className="w-4 h-4 mt-0.5 text-red-600 animate-(--animate-fade-pulse-fast)" aria-label="Critical" />}
                            {flag === 'warning' && <AlertTriangle className="w-4 h-4 mt-0.5 text-yellow-500 animate-(--animate-fade-pulse)" aria-label="Warning" />}
                        </span>

                        <span 
                            className={`text-xs font-mono`}
                            style={{color: statusColor}}>
                                {time}
                        </span>
                    </div>
                    
                </div>

                <div className="flex items-center gap-3">
                    <div className="flex-auto bg-gray-200 rounded-full h-1 mt-0.5">
                        <div
                            className={`h-1 rounded-full transition-all duration-300`}
                            style={{width: `${progress}%`, backgroundColor: statusColor}} />
                    </div>
                    <span className="text-xs font-mono text-gray-500">{progress}%</span>
                </div>

            </div>
        </>
    )
}