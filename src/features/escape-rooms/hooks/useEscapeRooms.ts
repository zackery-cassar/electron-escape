import { useCallback, useEffect, useState } from "react";
import { getEscapeRooms } from "../api/get-escape-rooms";
import type { EscapeRoom } from "../types/EscapeRoom";

export function useEscapeRooms() {
  const [rooms, setRooms] = useState<EscapeRoom[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<unknown>(null);

  const fetchRooms = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const data = await getEscapeRooms();
      setRooms(data);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchRooms();
  }, [fetchRooms]);

  return { rooms, loading, error, refresh: fetchRooms };
}
