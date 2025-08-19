import reactLogo from "@/assets/react-logo.svg";

export function ReactIcon({ size = 24 , className }: { size?: number | string, className?: string }) {
  return (
    <img
      src={reactLogo}
      width={size}
      height={size}
      className={["animate-(--animate-spin)", className].join(" ")}
      alt="React Logo"
    />
  );
}
