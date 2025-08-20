import { SidebarItemOtherGame } from "../sidebar-item/sidebar-item-other-game";
import { SidebarSection } from "../sidebar-section";


export function OtherGamesSection() {

	return (
		<SidebarSection title="Other Games">
			<SidebarItemOtherGame name="Floor is Lava" time="05:21" progress={73} color="oklch(58.8% 0.158 241.966)" />
		</SidebarSection>
	)
}