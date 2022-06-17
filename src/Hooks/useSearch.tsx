import { useEffect, useState } from "react";
import type { searchResult, place } from "src/App/Entities";
import { searchMockData } from "src/App/Entities";

export const useSearch = () => {
  const [selectedPlace, setSelectedPlace] = useState<place>();
  const [roomItems, setRoomItems] = useState<searchResult[]>();
  const [scannedItems, setScannedItems] = useState<string[]>([]);
  const [step, setStep] = useState<number>(0);
  const [nextStepEnabled, setNextStateEnabled] = useState<boolean>(false);

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
    //TODO: Connect with API
    setRoomItems(searchMockData);
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
