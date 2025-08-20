import { CircleAlert } from "lucide-react";

export function CriticalAlert() {
  return (
    <CircleAlert
      className="w-4 h-4 text-red-600 animate-(--animate-fade-pulse-fast)"
      aria-label="Critical"
    />
  );
}
