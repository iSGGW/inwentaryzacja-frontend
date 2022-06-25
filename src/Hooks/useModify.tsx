import { useEffect, useState } from "react";
import type { item, placeIDs, searchResult } from "src/App/Entities";
import { fetchItems, updateItem } from "src/App/Endpoints/modify";

export const useModify = () => {
  const [token, setToken] = useState<string>();
  const [selectedPlace, setSelectedPlace] = useState<placeIDs>();
  const [roomItems, setRoomItems] = useState<item[]>([]);
  const [loadingItems, setLoadingItems] = useState<boolean>(false);
  const [openedResult, setOpenedResult] = useState<searchResult>();

  async function getItems(selectedRoom: string, token: string) {
    if (selectedPlace?.room && token) {
      setLoadingItems(true);
      const items = await fetchItems(selectedRoom, token);
      console.log(items);
      setRoomItems(items);
      setLoadingItems(false);
    }
  }

  useEffect(() => {
    if (selectedPlace?.room && token) {
      getItems(selectedPlace?.room, token).catch((e) => console.error(e));
    } else {
      setRoomItems([]);
      setOpenedResult(undefined);
    }
    console.log(roomItems);
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

  const modifyItem = (modifiedItem: item) => {
    if (token) {
      updateItem(modifiedItem.id, modifiedItem, token)
        .then(() => {
          if (selectedPlace?.room && token) {
            getItems(selectedPlace?.room, token).catch((e) => console.error(e));
          }
        })
        .catch((e) => console.error(e));
    }
  };

  return {
    addNewItem,
    deleteItem,
    loadingItems,
    modifyItem,
    openedResult,
    roomItems,
    selectedPlace,
    setOpenedResult,
    setSelectedPlace,
    setToken,
  };
};
