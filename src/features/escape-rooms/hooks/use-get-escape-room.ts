import { useGetEscapeRooms } from "./use-get-escape-rooms";

export function useGetEscapeRoom(id: string | undefined) {
  const { escapeRooms, loading, error } = useGetEscapeRooms();

  const escapeRoom = escapeRooms.find((room) => room.id === id);

  return { escapeRoom, loading, error };
}
