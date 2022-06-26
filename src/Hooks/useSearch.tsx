import { useContext, useEffect, useState } from "react";
import {
  fetchItemsByRoom,
  fetchItemsById,
} from "src/App/Endpoints/searchResult";
import type { searchResult, placeIDs } from "src/App/Entities";

import { UserContext } from "src/App/App";

export const useSearch = () => {
  const [selectedPlace, setSelectedPlace] = useState<placeIDs>();
  const [roomItems, setRoomItems] = useState<searchResult[]>();
  const [scannedItems, setScannedItems] = useState<string[]>([]);
  const [step, setStep] = useState<number>(0);
  const [nextStepEnabled, setNextStateEnabled] = useState<boolean>(false);

  const userContext = useContext(UserContext);

  useEffect(() => {
    if (selectedPlace?.room) {
      setNextStateEnabled(true);
    } else {
      setNextStateEnabled(false);
    }
  }, [selectedPlace]);

  useEffect(() => setNextStateEnabled(false), [step]);

  const nextStep = () => setStep(step + 1);

  const addScannedItem = (item: string) => {
    const parsedItem = JSON.parse(item);
    if (parsedItem?.id) {
      if (!scannedItems.includes(parsedItem.id)) {
        setScannedItems((prevState) => [...prevState, parsedItem.id]);
      }
    }
  };

  useEffect(() => {
    if (step === 1 && scannedItems.length > 0) {
      setNextStateEnabled(true);
    } else if (step === 1 && !(scannedItems.length > 0)) {
      setNextStateEnabled(false);
    }
  }, [scannedItems]);

  const getComparedItems = () => {
    fetchItemsByRoom(selectedPlace?.room || "", userContext.user.token).then(
      (resp) => {
        const list: searchResult[] = [];
        const promises = scannedItems.map((scannedId) =>
          fetchItemsById(scannedId, userContext.user.token)
        );
        Promise.allSettled(promises).then((response) => {
          response.map((el) => {
            if (el.status !== "rejected") {
              const listElement = list.find(
                (listEl) => el.value.id === listEl.id
              );
              if (!listElement) {
                list.push(el.value);
              }
            }
          });
          const listRoom = resp.filter(
            (el) => !list.find((listEl) => listEl.id === el.id)
          );
          setRoomItems([...listRoom, ...list]);
        });
      }
    );
  };

  return {
    addScannedItem,
    getComparedItems,
    nextStep,
    nextStepEnabled,
    roomItems,
    scannedItems,
    selectedPlace,
    setSelectedPlace,
    step,
  };
};
