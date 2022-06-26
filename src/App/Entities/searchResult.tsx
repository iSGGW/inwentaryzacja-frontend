export interface searchResult {
  id: string;
  name: string;
  status: "1" | "2" | "3" | "4";
  room: {
    id: string;
    number: string;
    floor: {
      id: string;
      level: string;
      building: {
        id: string;
        number: string;
      };
    };
  };
}
