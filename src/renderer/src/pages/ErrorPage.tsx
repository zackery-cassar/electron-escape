export function ErrorPage(): React.JSX.Element {
  return (
    <div className="flex h-screen w-full flex-col items-center justify-center">
      <h1 className="text-2xl font-bold text-shadow-[0_0_8px_#FFFFFF]">404 Not Found</h1>
      <p className="mt-2 text-shadow-[0_0_8px_#FFFFFF]">
        The page you are looking for does not exist yet.
      </p>
    </div>
  )
}
