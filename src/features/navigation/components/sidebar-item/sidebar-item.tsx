export function SidebarItem({ name }: { name: string }) {
  return (
    <div className="relative py-3 px-4 hover:bg-slate-100 transition-all duration-200 cursor-pointer rounded-lg">
      <span className="font-medium text-sm text-gray-800">{name}</span>
    </div>
  );
}
