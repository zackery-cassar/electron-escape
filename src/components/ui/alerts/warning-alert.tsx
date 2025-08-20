import { AlertTriangle } from "lucide-react";

export function WarningAlert() {
  return (
    <AlertTriangle
      className="w-4 h-4 mt-0.5 text-yellow-500 animate-(--animate-fade-pulse)"
      aria-label="Warning"
    />
  );
}
