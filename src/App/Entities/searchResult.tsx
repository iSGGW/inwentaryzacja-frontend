export interface searchResult {
  id: string;
  name: string;
  floor: {
    id: string;
    name: string;
  };
  room: {
    id: string;
    name: string;
  };
}

export const searchMockData: searchResult[] = [
  {
    id: "1",
    name: "Krzeslo",
    floor: {
      id: "43",
      name: "2",
    },
    room: {
      id: "23",
      name: "25",
    },
  },
  {
    id: "421",
    name: "Komputer",
    floor: {
      id: "12",
      name: "1",
    },
    room: {
      id: "41",
      name: "14",
    },
  },
];

export interface room {
  id: string;
  name: string;
}

export interface floor {
  id: string;
  name: string;
  rooms: room[];
}

export const getMockFloors = (): floor[] => [
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
