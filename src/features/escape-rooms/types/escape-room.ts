export type EscapeRoom = {
  id: string;
  name: string;
  topic: string;
  host: string;
  color?: string;
};

export type EscapeRoomDTO = {
  host: string;
  name: string;
  port: number;
  topic: string;
  color?: string;
};
