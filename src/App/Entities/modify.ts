import type { room } from "src/App/Entities/places";

export interface item {
  createdBy: string;
  creationDate: string;
  id: string;
  lastUpdatedBy: string;
  manufacturer: string;
  name: string;
  room: room;
  serialNumber: string;
  status: "1" | "2" | "3" | "4";
  type: string;
  updateDate: string;
}
