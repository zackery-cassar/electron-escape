import { TriToggle } from "@/components/ui/tri-toggle"

export function EscapeRoomHeader() {
    const isOnline: boolean = true

    return (
        <div className="w-full h-32 px-12 border-b flex items-center justify-between">

            {/* Left Area */}
            <div className="flex flex-col gap-2">
                
                {/* Escape Room Name */}
                <h1 className="text-3xl font-semibold text-slate-800">Cottage Capers</h1>
                <div className="flex gap-5 items-center">

                    {/* Online/Offline Status Indiciator */}
                    <div className="flex w-18 gap-2 align items-center px-1"> {/* Using w-18 to stop shifting other elements. */}
                        <div className={`w-3 h-3 rounded-full shrink-0 ${ isOnline ? "bg-green-500" : "bg-red-500" }`} />
                        <p className="text-sm font-semibold text-slate-600">{ isOnline ? "Online" : "Offline" }</p>
                    </div>

                    {/* Hint Mode Selector */}
                    <TriToggle options={["No Hints","Nudge Occasionally","On Request"]} tooltips={["Don't send any hints at all.", "Send a hint if they seem like they are struggling.", "Only send a hint if they ask for one."]} defaultIndex={2} />
                </div>
            </div>

            {/* Center Area */}
            {/* Timer + Hint Selector + Phase Selector ?? */}

            {/* Timer + Room Controls */}
            <span className="font-mono tabular-nums text-2xl">01:00:00</span>

            
        </div>
    )
}