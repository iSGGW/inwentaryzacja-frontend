import { useEffect, useState } from "react";
import type { place, placeIDs, searchResult } from "src/App/Entities";
import { searchMockData } from "src/App/Entities";

export const useModify = () => {
  const [selectedPlace, setSelectedPlace] = useState<placeIDs>();
  const [roomItems, setRoomItems] = useState<searchResult[]>([]);
  const [openedResult, setOpenedResult] = useState<searchResult>();

  const getComparedItems = () => {
    //TODO: Connect with API
    setRoomItems(searchMockData);
  };

  useEffect(() => {
    if (selectedPlace?.room) {
      getComparedItems();
    } else {
      setRoomItems([]);
      setOpenedResult(undefined);
    }
  }, [selectedPlace]);

  const deleteItem = (id: string) => {
    setRoomItems((prevState) => {
      return prevState.filter((item) => item.id !== id);
    });
  };

  const addNewItem = () => {
    // if (selectedPlace?.floor && selectedPlace?.room) {
    //   const newItem: searchResult = {
    //     id: `New_${roomItems.length}`,
    //     name: "[Wpisz nazwę]",
    //     status: "1",
    //     floor: selectedPlace?.floor,
    //     room: selectedPlace?.room,
    //   };
    //   setRoomItems((prevState) => {
    //     const newState = [...prevState];
    //     newState.push(newItem);
    //     return newState;
    //   });
    // }
  };

  const modifyItem = (modifiedItem: searchResult) => {
    setRoomItems((prevState) => {
      const newState = [...prevState];
      const index = newState.findIndex((item) => item.id === modifiedItem.id);
      newState[index] = modifiedItem;
      return newState;
    });
  };

  return {
    addNewItem,
    deleteItem,
    openedResult,
    roomItems,
    modifyItem,
    selectedPlace,
    setOpenedResult,
    setSelectedPlace,
  };
};
