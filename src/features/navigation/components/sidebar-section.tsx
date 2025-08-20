import React from "react"

export function SidebarSection({
  title,
  children,
}: {
  title: string;
  children?: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-2 px-5 mb-5">
      <p className="text-xs font-semibold text-gray-500 uppercase tracking-widest">
        {title}
      </p>
      <ul className="flex flex-col">{children}</ul>
    </div>
  );
}
