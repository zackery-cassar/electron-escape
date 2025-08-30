import { useCallback, useRef, useState } from "react"
import { formatDuration } from "../utils/time"

type EditableTime = {
	isEditing: boolean
	inputRef: React.RefObject<HTMLInputElement>
	displayRef: React.RefObject<HTMLDivElement>
	inputValue: number
	inputWidthPx: number | null;
	startEditingAtClickPos: (e: React.MouseEvent) => void
	submit: () => void
	cancel: () => void
	onKeyDown: (e: React.KeyboardEvent) => void
}


export function useEditibleTimeInput( seconds: number, onCommitSeconds: (seconds: number) => void) : EditableTime {
	const [isEditing, setIsEditing] = useState(false)
	const [inputValue, setInputValue] = useState(formatDuration(seconds))
	const [inputWidth, setInputWidth] = useState<number | null>(null)

	const inputRef = useRef<HTMLInputElement>(null)
	const displayRef = useRef<HTMLDivElement>(null)

	const startEditingAtClickPos = useCallback((e: React.MouseEvent) => {
		const target = displayRef.current
		if(!target) return

		// Lock input width to prevent layout shift while editing
		setInputWidth(target.offsetWidth)

		const rect = target.getBoundingClientRect();
		const clickX = e.clientX - rect.left;
		const str = formatDurtation(seconds)
	})


}