import { EscapeRoomHeader } from "@/features/escape-rooms/components/escape-room-header";
import { useGetEscapeRoom } from "@/features/escape-rooms/hooks/use-get-escape-room";
import { TimerDisplay } from "@/features/timer/components/timer-display";
import { useParams } from "react-router";



export default function RoomPage() {
    const { id } = useParams()
    const { escapeRoom } = useGetEscapeRoom(id)
    
    return (
        <div className="flex flex-col w-full">
            <EscapeRoomHeader escapeRoom={escapeRoom} />

            <TimerDisplay />
        </div>
        
    )

}