export interface searchResult {
  id: string;
  name: string;
  status: "1" | "2" | "3" | "4";
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
    status: "1",
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
    status: "2",
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
