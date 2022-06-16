import { useState } from "react";
import { Button, Steps } from "antd";
import type { searchResult } from "src/App/Entities";

import { Container } from "src/Components/Container";
import { Description } from "src/Components/Description/Description";
import { SearchForm } from "src/Components/SearchForm";
import { Scanner } from "src/Components/Scanner";
import { SearchTable } from "src/Components/SearchTable";

import { useSearch } from "src/Hooks";

import styles from "./Search.module.css";

function Search() {
  const {
    addScannedItem,
    nextStep,
    nextStepEnabled,
    roomItems,
    scannedItems,
    selectedPlace,
    setSelectedPlace,
    step,
  } = useSearch();
  const [openedResult, setOpenedResult] = useState<searchResult>();

  const steps = [
    {
      title: "Wybór pomieszczenia",
      content: (
        <SearchForm
          selectedPlace={selectedPlace}
          onChangePlace={setSelectedPlace}
        />
      ),
    },
    {
      title: "Skanowanie przedmiotów",
      content: (
        <Scanner scannedItems={scannedItems} addScannedItem={addScannedItem} />
      ),
    },
    {
      title: "Wynik inwentaryzacji",
      content: "Last-content",
    },
  ];

  return (
    <Container>
      <div className={styles.search}>
        <Steps className={styles.steps} current={step}>
          {steps.map((item) => (
            <Steps.Step key={item.title} title={item.title} />
          ))}
        </Steps>
        {steps[step].content}
        {roomItems && (
          <>
            <Description result={openedResult} />
            <SearchTable
              results={roomItems}
              setOpenedResult={setOpenedResult}
            />
          </>
        )}
        <div className={styles.nextStep}>
          <Button disabled={!nextStepEnabled} type="primary" onClick={nextStep}>
            Dalej
          </Button>
        </div>
      </div>
    </Container>
  );
}

export default Search;
