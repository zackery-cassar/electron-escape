import { useEscapeRooms } from "@/features/escape-rooms/hooks/useEscapeRooms";
import { SidebarItemEscapeRoom } from "../sidebar-item/sidebar-item-escape-room";
import { SidebarSection } from "../sidebar-section";
import { DotPulse } from "@/components/ui/loaders/dot-pulse";


export function EscapeRoomsSection() {
	const { loading } = useEscapeRooms();
	
	if(loading) return (
		<div className="flex justify-center p-4">
			<DotPulse />
		</div>
	)

	return (
		<SidebarSection title="Escape Rooms">
			<SidebarItemEscapeRoom name="Cottage Capers" time="00:00" progress={100} color="oklch(72.3% 0.219 149.579)"/>
			<SidebarItemEscapeRoom name="Twisted Trials" time="1:00:00" progress={0} color="oklch(44.4% 0.177 26.899)"/>
			<SidebarItemEscapeRoom name="Buccaneers Bounty" time="45:32" progress={80} color="oklch(68.1% 0.162 75.834)"/>
			<SidebarItemEscapeRoom name="Arcade Black" time="02:15" progress={70} color="oklch(0% 0 0)"/>
			<SidebarItemEscapeRoom name="R18" time="50:48" progress={10} color="oklch(40.1% 0.17 325.612)"/>
			<SidebarItemEscapeRoom name="Dark Dungeon" time="12:45" progress={40} color="oklch(21% 0.034 264.665)"/>
			<SidebarItemEscapeRoom name="Mad Monster" time="02:58" progress={88} color="oklch(55.5% 0.163 48.998)"/>
		</SidebarSection>
	)
}