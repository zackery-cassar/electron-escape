import { Timer } from '@shared/types/timer'
import React, { useRef, useState } from 'react'
import {
  isColon,
  nextDigitPosition,
  previousDigitPosition,
  replaceValueAtPosition
} from '../utils/timerInput'
import { formatSeconds } from '../utils/formatSeconds'
import { parseTime } from '../utils/parseTime'
import { cn } from '@renderer/utils/cn'

type EditableTimerProps = {
  timer: Timer
}

export function EditableTimer({ timer }: EditableTimerProps): React.JSX.Element {
  const inputRef = useRef<HTMLInputElement>(null)
  const disabled = !timer.connected
  const [isEditing, setIsEditing] = useState(false)
  const [text, setText] = useState(timer.timeRemaining)

  const handleCommit = (): void => {
    if (!isEditing) return
    window.api.timer.set(timer.roomId, formatSeconds(parseTime(text)))
    setIsEditing(false)
  }

  const handleClick = (e: React.MouseEvent): void => {
    if (disabled || e.button !== 0) return
    setText(timer.timeRemaining)
    setIsEditing(true)
  }

  const handleKeyDown = (e: React.KeyboardEvent): void => {
    const input = inputRef.current
    if (!input) return

    const cursorPosition = input.selectionStart ?? 0
    const currentValue = text

    if (e.key === 'Enter') input.blur()
    else if (e.key === 'Escape') setIsEditing(false)
    else if (e.key === 'Backspace') {
      e.preventDefault() // Prevent the default backspace behavior

      // Find the position of the previous digit (ignoring non-digit characters)
      const position = previousDigitPosition(currentValue, cursorPosition)
      if (position < 0) return

      // Replace the character at the found position with '0'
      const newValue = replaceValueAtPosition(currentValue, position, '0')
      setText(newValue)

      // Move the cursor to the edited position
      setTimeout(() => input.setSelectionRange(position, position), 0)
    } else if (e.key === 'Delete') {
      e.preventDefault() // Prevent the default delete behavior

      // Find the position of the next digit (ignoring non-digit characters)
      const position = nextDigitPosition(currentValue, cursorPosition)
      if (position > currentValue.length) return

      // Update the value
      const newValue = replaceValueAtPosition(currentValue, position, '0')
      setText(newValue)

      // Move the cursor to the next editable position
      setTimeout(() => {
        let newPosition = position + 1
        while (newPosition < newValue.length && isColon(newValue, newPosition)) newPosition++
        input.setSelectionRange(newPosition, newPosition)
      }, 0)
    } else if (/^\d$/.test(e.key)) {
      e.preventDefault() // Prevent the default character input behavior

      // Find the position of the next digit (ignoring non-digit characters)
      const position = nextDigitPosition(currentValue, cursorPosition)
      if (position > currentValue.length) return

      // Replace the character at the found position with the pressed key
      const newValue = replaceValueAtPosition(currentValue, position, e.key)
      setText(newValue)

      // Move the cursor to the next editable position
      setTimeout(() => {
        let newPosition = position + 1
        while (newPosition < newValue.length && isColon(newValue, newPosition)) newPosition++
        input.setSelectionRange(newPosition, newPosition)
      }, 0)
    }
  }

  return (
    <input
      type="text"
      ref={inputRef}
      value={isEditing ? text : timer.timeRemaining}
      inputMode="numeric"
      disabled={disabled}
      readOnly={!isEditing}
      onBlur={handleCommit}
      onKeyDown={handleKeyDown}
      onClick={handleClick}
      className={cn(
        'box-content w-45 rounded border-0 bg-transparent py-1.5 text-center leading-none tracking-wide tabular-nums transition-colors focus:ring-0 focus:outline-none',
        disabled && 'opacity-45'
      )}
      autoFocus
    />
  )
}
