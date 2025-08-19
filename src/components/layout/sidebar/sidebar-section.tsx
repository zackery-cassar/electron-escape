import React from "react";

interface SidebarSectionProps {
  title: string
  children: React.ReactNode
}

export default function SidebarSection({ title, children }: SidebarSectionProps) {
  return (
    <div className="flex flex-col gap-2 px-5">
      <p className="text-xs font-semibold text-gray-500 uppercase tracking-widest">{title}</p>
      <ul className="flex flex-col">
        {children}
      </ul>
    </div>
  );
}
