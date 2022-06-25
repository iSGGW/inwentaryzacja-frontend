export interface building {
  address: string;
  id: string;
  name: string;
  number: string;
}

export interface floor {
  id: string;
  level: string;
  building: building;
}

export interface room {
  id: string;
  number: string;
  type: string;
  floor: floor;
}

export interface place {
  building?: building;
  floor?: floor;
  room?: room;
}

export interface placeIDs {
  building?: building["id"];
  floor?: floor["id"];
  room?: room["id"];
}

export interface places {
  buildings: building[];
  floors: floor[];
  rooms: room[];
}
