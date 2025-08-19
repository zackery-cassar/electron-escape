import { Brand } from "@/components/ui/brand";

export default function WelcomePage() {
  return (
    <div className="w-full h-screen flex flex-col items-center justify-center">
      <p className="font-bold uppercase text-gray-800 text-1xl">Welcome to</p>
      <Brand size="6xl" />
      <p className="font-bold text-gray-800 text-1xl">
        Built with React + Tailwindcss + Radix UI
      </p>
    </div>
  );
}
