import { useEscapeRooms } from "../../../features/escape-rooms/hooks/useEscapeRooms";
import EscapeRoomItem from "./sidebar-item/escape-room-item";
import { DotPulse } from "ldrs/react";
import 'ldrs/react/DotPulse.css'

export default function EscapeRoomsSection() {
    const { rooms, loading, error, refresh } = useEscapeRooms();
        
    if(loading) return (
        <div className="flex justify-center p-4">
            <DotPulse size="25" speed="1.3" color="oklch(37.2% 0.044 257.287)" />
        </div>
    )

    return (
        <>
            <EscapeRoomItem name="Cottage Capers" time="00:00" progress={100} statusColor="oklch(72.3% 0.219 149.579)"/>
            <EscapeRoomItem name="Twisted Trials" time="1:00:00" progress={0} statusColor="oklch(44.4% 0.177 26.899)"/>
            <EscapeRoomItem name="Buccaneers Bounty" time="45:32" progress={80} statusColor="oklch(68.1% 0.162 75.834)"/>
            <EscapeRoomItem name="Arcade Black" time="02:15" progress={70} statusColor="oklch(0% 0 0)"/>
            <EscapeRoomItem name="R18" time="50:48" progress={10} statusColor="oklch(40.1% 0.17 325.612)"/>
            <EscapeRoomItem name="Dark Dungeon" time="12:45" progress={40} statusColor="oklch(21% 0.034 264.665)"/>
            <EscapeRoomItem name="Mad Monster" time="02:58" progress={88} statusColor="oklch(55.5% 0.163 48.998)"/>
        </>
    )
}