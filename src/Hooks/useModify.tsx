import { useEffect, useState } from "react";
import type { item, placeIDs, room, searchResult } from "src/App/Entities";
import {
  addItem,
  deleteItem,
  fetchItems,
  updateItem,
} from "src/App/Endpoints/modify";

export const useModify = () => {
  const [token, setToken] = useState<string>();
  const [selectedPlace, setSelectedPlace] = useState<placeIDs>();
  const [room, setRoom] = useState<room>();
  const [roomItems, setRoomItems] = useState<item[]>([]);
  const [loadingItems, setLoadingItems] = useState<boolean>(false);
  const [openedResult, setOpenedResult] = useState<searchResult>();

  async function getItems(selectedRoom: string, token: string) {
    if (selectedPlace?.room && token) {
      setLoadingItems(true);
      const items = await fetchItems(selectedRoom, token);
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
  }, [selectedPlace]);

  const addNewItem = () => {
    if (token && room) {
      const item = {
        manufacturer: "",
        name: "",
        room: room,
        serialNumber: "",
        status: "1" as item["status"],
        type: "",
      } as item;

      addItem(item, token)
        .then(() => {
          if (selectedPlace?.room && token) {
            getItems(selectedPlace?.room, token).catch((e) => console.error(e));
          }
        })
        .catch((e) => console.error(e));
    }
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

  const removeItem = (itemId: string) => {
    if (token) {
      deleteItem(itemId, token)
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
    loadingItems,
    modifyItem,
    openedResult,
    removeItem,
    roomItems,
    selectedPlace,
    setOpenedResult,
    setRoom,
    setSelectedPlace,
    setToken,
  };
};
