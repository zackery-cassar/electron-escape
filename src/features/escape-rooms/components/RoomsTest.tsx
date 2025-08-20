import { useEffect, useState } from "react";
import type { EscapeRoom } from "../types/escape-room";
import { getEscapeRooms } from "../api/get-escape-rooms";

export default function RoomsTest() {
  const [rooms, setRooms] = useState<EscapeRoom[]>([]);

  useEffect(() => {
    getEscapeRooms().then((r) => {
      setRooms(r);
    });
  }, []);


  return (
    <ul>
        {rooms.map((r) => (
            <li key={r.id}>{r.id} - {r.name} - {r.host}</li>
        ))}
    </ul>
  )
}
