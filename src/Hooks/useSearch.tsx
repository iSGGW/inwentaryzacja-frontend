import { useEffect, useState } from "react";
import type { searchResult, place } from "src/App/Entities";
import { searchMockData } from "src/App/Entities";

export const useSearch = () => {
  const [selectedPlace, setSelectedPlace] = useState<place>();
  const [roomItems, setRoomItems] = useState<searchResult[]>();
  const [scanner, setScanner] = useState<boolean>(false);
  const [scannedItems, setScannedItems] = useState<string[]>([]);

  useEffect(() => {
    if (selectedPlace?.room) {
      setScanner(true);
      // setRoomItems(searchMockData);
    } else {
      setScanner(false);
    }
  }, [selectedPlace]);

  return {
    scanner,
    scannedItems,
    setScannedItems,
    selectedPlace,
    setSelectedPlace,
    roomItems,
  };
};
