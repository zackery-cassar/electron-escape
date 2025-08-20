import { useGetEscapeRooms } from "@/features/escape-rooms/hooks/use-get-escape-rooms";
import { SidebarItemEscapeRoom } from "../sidebar-item/sidebar-item-escape-room";
import { SidebarSection } from "../sidebar-section";
import { DotPulse } from "@/components/ui/loaders/dot-pulse";
import { Link } from "react-router";


export function EscapeRoomsSection() {
	const { escapeRooms, loading } = useGetEscapeRooms();
	
	if(loading) return (
		<div className="flex justify-center p-4">
			<DotPulse />
		</div>
	)

	return (
		<SidebarSection title="Escape Rooms">
			
			{/* List of all the Escape Rooms */}
			{escapeRooms.map((escapeRoom) => (
				<Link key={escapeRoom.id} to={`/${escapeRoom.id}`}>
					<SidebarItemEscapeRoom key={escapeRoom.id} name={escapeRoom.name} time="50:00" progress={70} color={escapeRoom.color} />
				</Link>
			))}

		</SidebarSection>
	)
}