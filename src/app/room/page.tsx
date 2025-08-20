import { EscapeRoomHeader } from "@/features/escape-rooms/components/escape-room-header";
import { useGetEscapeRoom } from "@/features/escape-rooms/hooks/use-get-escape-room";
import { useParams } from "react-router";

export default function RoomPage() {
    const { id } = useParams()
    const { escapeRoom } = useGetEscapeRoom(id)

    // If there is an error then return this
    if (!escapeRoom) return null;

    return (
        <div className="flex flex-col w-full">
            <div className="">
                <EscapeRoomHeader escapeRoom={escapeRoom} />
            </div>
        </div>
        
    )

}