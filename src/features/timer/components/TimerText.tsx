import type { EscapeRoom } from "@/features/escape-rooms/types/escape-room"
import { useTimer } from "../hooks/useTimer"
import { formatDuration } from "../utils/time"

export function TimerText({ escapeRoom } : { escapeRoom: EscapeRoom | undefined }) {
	const id: string = escapeRoom ? escapeRoom.id : ""
	const { timeRemaining } = useTimer(id)

	return (
		<span className="text-xs font-mono">
			{formatDuration(timeRemaining)}
		</span>
	)


}