import { LoadingPage } from '@renderer/pages'
import { useFetchVenue, useLoading } from '@renderer/store/venueStore'
import { useEffect } from 'react'
import { RouterProvider } from 'react-router-dom'
import { router } from './Router'
import { useMqttListeners } from '@renderer/hooks/useMqttListeners'

export default function App(): React.JSX.Element {
  const fetchVenue = useFetchVenue()
  const loading = useLoading()
  useMqttListeners()

  useEffect(() => {
    fetchVenue('413e635b-c94d-4205-9e39-e97756a7368d')
  }, [fetchVenue])

  if (loading) return <LoadingPage />

  return <RouterProvider router={router} />
}
