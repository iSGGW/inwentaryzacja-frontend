import { useEffect, useState } from "react";
import type { searchResult, place } from "src/App/Entities";
import { searchMockData } from "src/App/Entities";

export const useSearch = () => {
  const [selectedPlace, setSelectedPlace] = useState<place>();
  const [roomItems, setRoomItems] = useState<searchResult[]>();
  const [step, setStep] = useState<number>(0);
  const [nextStepEnabled, setNextStateEnabled] = useState<boolean>(false);
  const [scannedItems, setScannedItems] = useState<string[]>([]);

  useEffect(() => {
    if (selectedPlace?.room) {
      setNextStateEnabled(true);
    } else {
      setNextStateEnabled(false);
    }
  }, [selectedPlace]);

  useEffect(() => setNextStateEnabled(false), [step]);

  const nextStep = () => setStep(step + 1);

  const getComparedItems = () => {
    //TODO: Connect with API
    console.log(scannedItems);
    setRoomItems(searchMockData);
  };

  return {
    getComparedItems,
    nextStep,
    nextStepEnabled,
    roomItems,
    scannedItems,
    selectedPlace,
    setScannedItems,
    setSelectedPlace,
    step,
  };
};
