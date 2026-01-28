import { useEscapeRooms } from '@renderer/store/venueStore'
import { EscapeRoomItem } from '../items/EscapeRoomItem'
import { SidebarSection } from '../SidebarSection'

export function EscapeRoomSection(): React.JSX.Element {
  const rooms = useEscapeRooms()

  return (
    <SidebarSection title="Escape Rooms" scrollable={true} className="flex-1">
      {rooms?.map((room) => (
        <EscapeRoomItem key={room.id} id={room.id} name={room.name} />
      ))}
    </SidebarSection>
  )
}
