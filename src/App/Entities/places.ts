export interface room {
  id: string;
  name: string;
}

export interface floor {
  id: string;
  name: string;
  rooms?: room[];
}

export interface place {
  floor?: floor;
  room?: room;
}

export const fetchPlaces: floor[] = [
  {
    id: "43",
    name: "1",
    rooms: [
      {
        id: "321",
        name: "108",
      },
      {
        id: "534",
        name: "109",
      },
      {
        id: "2423",
        name: "110",
      },
    ],
  },
  {
    id: "321",
    name: "2",
    rooms: [
      {
        id: "341",
        name: "208",
      },
      {
        id: "548",
        name: "209",
      },
      {
        id: "242",
        name: "210",
      },
    ],
  },
  {
    id: "432",
    name: "3",
    rooms: [
      {
        id: "457",
        name: "308",
      },
      {
        id: "134",
        name: "309",
      },
      {
        id: "223",
        name: "310",
      },
    ],
  },
  {
    id: "123",
    name: "4",
    rooms: [
      {
        id: "621",
        name: "408",
      },
      {
        id: "544",
        name: "409",
      },
      {
        id: "2123",
        name: "410",
      },
    ],
  },
];
