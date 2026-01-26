import { LoadingPage } from '@renderer/pages'
import { useEscapeRoomStore } from '@renderer/store/escapeRoomStore'
import { useEffect } from 'react'
import { RouterProvider } from 'react-router-dom'
import { router } from './Router'

export default function App(): React.JSX.Element {
  const fetchRooms = useEscapeRoomStore((state) => state.fetchRooms)
  const loading = useEscapeRoomStore((state) => state.loading)

  useEffect(() => {
    fetchRooms('413e635b-c94d-4205-9e39-e97756a7368d')
  }, [fetchRooms])

  if (loading) return <LoadingPage />

  return <RouterProvider router={router} />
}
