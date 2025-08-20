import { db } from "@/lib/firebase";
import { collection, getDocs } from "firebase/firestore";
import type { EscapeRoom, EscapeRoomDTO } from "../types/escape-room"

export async function getEscapeRooms(): Promise<EscapeRoom[]> {
  const snapshot = await getDocs(collection(db, "escape-rooms"));

  return snapshot.docs.map((doc) => {
		const dto = doc.data() as EscapeRoomDTO;

		return {
			id: doc.id,
			name: dto.name ?? doc.id,
			topic: dto.topic ?? "",
			host: dto.host,
			color: dto.color ?? undefined
		}
	})
}