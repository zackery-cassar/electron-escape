import { ChevronDown } from "lucide-react";
import { Select } from "radix-ui";
import React from "react";
import { cn } from "@/lib/utils";


export function Selector({ value, onValueChange, children, className }: { value?: string | undefined, onValueChange?: (value: string) => void, children: React.ReactNode, className?: string }) {
	return (
		<Select.Root value={value} onValueChange={onValueChange}>
			<Select.Trigger
				className={cn(`inline-flex items-center justify-between rounded-md border
				border-input bg-background px-3 py-2 text-sm font-medium
				ring-offset-background placeholder:text-muted-foreground
				focus:outline-none focus:ring-1 focus:ring-zinc-400
				focus:ring-offset-2 disabled:cursor-not-allowed
				disabled:opacity-50 h-9`, className)}
				
				>

				<Select.Value className="truncate flex-1 text-left" />
				<Select.Icon className="ml-2 flex-shrink-0">
					<ChevronDown className="h-4 w-4 opacity-50" />
				</Select.Icon>
			</Select.Trigger>

			<Select.Portal>
				<Select.Content
					className={cn(`relative z-50 max-h-96 min-w-[8rem] overflow-hidden rounded-md
					border bg-white text-black shadow-md
					data-[state=open]:animate-in
					data-[state=closed]:animate-out
					data-[state=closed]:fade-out-0
					data-[state=open]:zoom-in-95
					data-[side=bottom]:slide-in-from-top-2
					data-[side=left]:slide-in-from-right-2
					data-[side=right]:slide-in-from-left-2
					data-[side=top]:slide-in-from-bottom-2`, className)}
					position="popper"
					side="bottom"
					align="start"
					sideOffset={4}>

					<Select.Viewport>
						{children}
					</Select.Viewport>
				</Select.Content>
			</Select.Portal>

		</Select.Root>
	)
}