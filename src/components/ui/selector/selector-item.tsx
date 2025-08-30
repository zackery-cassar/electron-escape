import { Check } from "lucide-react";
import { Select } from "radix-ui";
import type React from "react";


export function SelectorItem({ value, children }: { value: string, children: React.ReactNode }) {
	return(
		<Select.Item
			key={value}
			value={value}
			className="relative flex w-full cursor-default select-none
			items-center rounded-sm py-1.5 pl-2 pr-8 text-sm outline-none
			focus:bg-accent focus:text-accent-foreground
			data-[disabled]:pointer-events-none
			data-[disabled]:opacity-50">
			<Select.ItemText className="truncate">{children}</Select.ItemText>
			<Select.ItemIndicator className="absolute right-2 flex h-3.5 w3.5 items-center justify-center">
				<Check className="h-4 w-4" />
			</Select.ItemIndicator>
		</Select.Item>
	)
}