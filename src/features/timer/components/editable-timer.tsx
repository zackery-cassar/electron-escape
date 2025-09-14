import React, { useState, useEffect } from "react";
import { formatDuration } from "../utils/time";
import { isColon, nextDigitPosition, previousDigitPosition, replaceValueAtPosition } from "../utils/timer-input";
import { useTimerInputEditor } from "../hooks/use-timer-input-editor";

type Props = {
  value: number;
  onChange: (seconds: number) => void;
  className?: string;
  disabled?: boolean;
};

export function EditableTimer({
  value,
  onChange,
  className,
  disabled,
}: Props) {
  const [inputValue, setInputValue] = useState(formatDuration(value));
  const { isEditing, inputRef, onClick, commit, cancel } = useTimerInputEditor({ disabled, value, onChange, text: inputValue, setText: setInputValue })

  // Keep inputValue in sync if parent changes value while not editing
  useEffect(() => {
    if (!isEditing) setInputValue(formatDuration(value));
  }, [value, isEditing]);

  // Handle key press
  const handleInputKeyDown = (e: React.KeyboardEvent) => {
    // Make sure we can get the current input reference.
    const input = inputRef.current
    if (!input) return

    // Get the current cursor position and value
    const cursorPosition = input.selectionStart ?? 0
    const currentValue = inputValue

    // Confirm edit on Enter, cancel on Escape
    if (e.key === "Enter") commit();
    if (e.key === "Escape") cancel();

    // Backspace: zero out the previous digit.
    if(e.key === "Backspace") {
      e.preventDefault()  // Prevent default backspace behavior.

      const position = previousDigitPosition(currentValue, cursorPosition)
      if (position < 0) return // At the beginning, do nothing.

      // Update the value.
      const newValue = replaceValueAtPosition(currentValue, position, "0")
      setInputValue(newValue)

      // Move the cursor to the edited position.
      setTimeout(() => input.setSelectionRange(position, position), 0)
      return
    }
      
    // Delete: zero out the next digit.
    if(e.key === "Delete") {
      e.preventDefault()  // Prevent default delete behavior.

      const position = nextDigitPosition(currentValue, cursorPosition)
      if (position >= currentValue.length) return // At the end, do nothing.

      // Update the value.
      const newValue = replaceValueAtPosition(currentValue, position, "0")
      setInputValue(newValue)

      // Move the cursor after the edited position.
      setTimeout(() => {
        let newPosition = position + 1
        while(newPosition < newValue.length && isColon(newValue, newPosition)) newPosition++
        input.setSelectionRange(newPosition, newPosition)
      }, 0)
      return
    }

    // Handle digit key input: overwrite the next digit.
    if (/^\d$/.test(e.key)) {
      e.preventDefault();

      const position = nextDigitPosition(currentValue, cursorPosition)
      if (position >= currentValue.length) return // At the end, do nothing.

      // Update the value
      const newValue = replaceValueAtPosition(currentValue, position, e.key)
      setInputValue(newValue)
      
      // Move the cursor after the edited position.
      setTimeout(() => {
        let newPosition = position + 1
        while(newPosition < newValue.length && isColon(newValue, newPosition)) newPosition++
        input.setSelectionRange(newPosition, newPosition)
      }, 0)
      return
    }
  };

  return (
    <div className={className}>
      <input
        disabled={disabled}
        ref={inputRef}
        type="text"
        value={inputValue}
        readOnly={!isEditing}
        onClick={onClick}
        onBlur={commit}
        onKeyDown={handleInputKeyDown}
        placeholder="00:00:00"
        inputMode="numeric"
        className="w-[180px] tracking-wide box-content
            bg-transparent border-0 rounded text-center
            focus:outline-none focus:ring-0 focus:bg-muted/30
            transition-colors"
        autoFocus
      />
    </div>
  );
}
