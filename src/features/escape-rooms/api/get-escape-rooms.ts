import { collection, getDocs } from "firebase/firestore";
import { db } from "../../../lib/firebase";
import type { EscapeRoom, EscapeRoomDTO } from "../types/EscapeRoom"

export async function getEscapeRooms(): Promise<EscapeRoom[]> {
    const snap = await getDocs(collection(db, "escape-rooms"));
    return snap.docs.map((d) => {
        const dto = d.data() as EscapeRoomDTO;
        return {
            id: d.id,
            name: dto.name ?? d.id,
            topic: dto.topic ?? "",
            host: dto.host
        }
    })
}