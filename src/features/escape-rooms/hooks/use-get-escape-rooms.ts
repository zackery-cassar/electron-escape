import { useEffect, useState } from "react";
import { getEscapeRooms } from "../api/get-escape-rooms";
import type { EscapeRoom } from "../types/escape-room";



export function useGetEscapeRooms() {
  const [escapeRooms, setEscapeRooms] = useState<EscapeRoom[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<unknown>(null);

  useEffect(() => {
    const fetchEscapeRooms = async() => {
      try {
        const data = await getEscapeRooms();
        setEscapeRooms(data);
      } catch(err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    }

    fetchEscapeRooms()
  }, [])

  return { escapeRooms, loading, error }
}