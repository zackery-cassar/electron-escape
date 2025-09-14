import { useCallback, useRef, useState } from "react"
import { formatDuration, parseDuration } from "../utils/time"

type Args = {
	disabled?: boolean
	value: number
	onChange: (seconds: number) => void
	text: string
	setText: (s: string) => void
}

export function useTimerInputEditor({ disabled, value, onChange, text, setText }: Args) {
	const [isEditing, setIsEditing] = useState(false)
	const inputRef = useRef<HTMLInputElement>(null)

	const onClick = useCallback(() => {
		if (disabled) return
		setIsEditing(true)

		// Focus next tick so React has applied readOnly=false, etc.
		setTimeout(() => {
			const element = inputRef.current
			if (!element) return
			element.focus()

			// TODO: Caret placement
		}, 0)
	}, [disabled])

	const commit = useCallback(() => {
		if (disabled) return
		const parsed = parseDuration(text)
		if (parsed != null) onChange(parsed)
		setIsEditing(false)
	}, [disabled, onChange, text])

	const cancel = useCallback(() => {
		setText(formatDuration(value))
		setIsEditing(false)
	}, [setText, value])

	return {
		isEditing,
		setIsEditing,
		inputRef,
		onClick,
		commit,
		cancel
	}
}