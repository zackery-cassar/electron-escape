import React, { useState, useEffect } from "react";
import { formatDuration, parseDuration } from "../utils/time";

type Props = {
  value: number;
  onChange: (seconds: number) => void;
  className?: string;
  disabled?: boolean;
  autoFocusOnEdit?: boolean;
};

export function EditableTimer({
  value,
  onChange,
  className,
  disabled,
  autoFocusOnEdit = true,
}: Props) {
  const [isEditing, setIsEditing] = useState(false);
  const [inputValue, setInputValue] = useState(formatDuration(value));
  const inputRef = React.useRef<HTMLInputElement>(null);

  // Keep inputValue in sync if parent changes value while not editing
  useEffect(() => {
    if (!isEditing) setInputValue(formatDuration(value));
  }, [value, isEditing]);

  // Confirm the input
  const commit = () => {
    const parsed = parseDuration(inputValue);
    if (parsed != null) onChange(parsed);
    setIsEditing(false);
  };

  // Cancel the input
  const cancel = () => {
    setInputValue(formatDuration(value));
    setIsEditing(false);
  };

  // Handle key press
  const handleInputKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") commit();
    if (e.key === "Escape") cancel();

    // Handle deleting the keys and zeroing out the digits
    if (e.key === "Backspace" || e.key === "Delete") {
      // Prevent default backspace/delete behavior
      e.preventDefault()
      
      // Get the current input element
      const input = inputRef.current
      if (!input) return

      // Get current value and cursor position
      const cursorPos = input.selectionStart || 0
      const currentValue = inputValue

      // Handle all the backspace key inputs
      if(e.key === "Backspace") {
        
        // Get the previous cursor position to move to, accounting for the : in the string
        let previousDigitPos = cursorPos - 1
        while(previousDigitPos >= 0 && currentValue[previousDigitPos] === ":") previousDigitPos--
        if(previousDigitPos < 0) return // If we are at the beginning or no digit found then don't do anything

        // Replace the digit at the found position with zero
        const newValue = currentValue.substring(0, previousDigitPos) + "0" + currentValue.substring(previousDigitPos + 1);
        setInputValue(newValue)

        // Finally move the cursor to the position we just zeroed out
        setTimeout(() => input.setSelectionRange(previousDigitPos, previousDigitPos), 0);
      }
      
      // Handle all the delete key inputs
      if(e.key === "Delete") {
        let nextDigitPos = cursorPos
        while(nextDigitPos <= currentValue.length && currentValue[nextDigitPos] === ":") nextDigitPos++
        if(nextDigitPos >= currentValue.length) return // If we are at the end then don't do anything

        // Replace the digit at the found position with zero
        const newValue = currentValue.substring(0, nextDigitPos) + "0" + currentValue.substring(nextDigitPos + 1);
        setInputValue(newValue)
        
        // Finally move the cursor to the position in front of the one we just zeroed out
        setTimeout(() => {
          let newCursorPos = nextDigitPos + 1
          while(newCursorPos < newValue.length && newValue[newCursorPos] === ":") newCursorPos++
          input.setSelectionRange(newCursorPos, newCursorPos)
        }, 0);
      }
    }

    // Handles all digit key inputs
    if (/^\d$/.test(e.key)) {
      e.preventDefault();

      // Get the current input element
      const input = inputRef.current
      if (!input) return

      // Get current value and cursor position
      const selectionStart = input.selectionStart || 0
      const currentValue = inputValue

      const cursorPos = selectionStart
      let nextDigitPos = cursorPos
      while(nextDigitPos < currentValue.length && currentValue[nextDigitPos] === ":") nextDigitPos++
      if(nextDigitPos >= currentValue.length) return // If we are at the end then don't do anything

      const newValue = currentValue.substring(0, nextDigitPos) + e.key + currentValue.substring(nextDigitPos + 1);
      setInputValue(newValue)

      setTimeout(() => {
        let newCursorPos = nextDigitPos + 1
        while(newCursorPos < newValue.length && newValue[newCursorPos] === ":") newCursorPos++
        input.setSelectionRange(newCursorPos, newCursorPos)
      }, 0)
      
    }





  };

  // Handle display click
  const handleDisplayClick = () => {
    if (disabled) return;
    setIsEditing(true);
  };

  return (
    <div className={className}>
      {/* {isEditing ? ( */}
      <input
        ref={inputRef}
        type="text"
        value={inputValue}
        readOnly={!isEditing}
        onClick={handleDisplayClick}
        onBlur={commit}
        onKeyDown={handleInputKeyDown}
        placeholder="00:00:00"
        inputMode="numeric"
        className="w-[180px] tracking-wide box-content
            bg-transparent border-0 rounded text-center
            focus:outline-none focus:ring-0 focus:bg-muted/30
            transition-colors"
        autoFocus={autoFocusOnEdit}
      />
    </div>
  );
}
