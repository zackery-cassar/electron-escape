import { Collapsible } from "radix-ui";
import { useState } from "react";

export default function SidebarSectionCollapsible() {
    const [open, setOpen] = useState(true)

    return(
        <Collapsible.Root open={open} onOpenChange={setOpen} className="mt-4">
            <Collapsible.Trigger className="w-full items-center justify-between px-4 py-2
            text-sm font-medium text-gray-700
            hover:bg-gray-100 rounded-lg
            focus:outline-none">
                Escape Rooms
            </Collapsible.Trigger>

            <Collapsible.Content className="mt-1 ml-4 border-1 border-gray-300 data-[state=closed]:animate-(--animate-slide-up) data-[state=open]:animate-(--animate-slide-down)">
                <ul>
                    <li>
                        <button className="w-full text-left px-4 py-2 text-sm text-gray-600 hover:bg-gray-100 rounded-lg">
                            Cottage Capers
                        </button>
                    </li>
                </ul>
            </Collapsible.Content>
        </Collapsible.Root>
    )
}