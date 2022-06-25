import { Button, Steps } from "antd";

import { Container } from "src/Components/Container";
import { SearchForm } from "src/Components/SearchForm";
import { Scanner } from "src/Components/Scanner";
import { SearchReport } from "src/Components/SearchReport";

import { useSearch } from "src/Hooks";

import styles from "./Search.module.css";

function Search() {
  const {
    addScannedItem,
    nextStep,
    nextStepEnabled,
    roomItems,
    getComparedItems,
    scannedItems,
    setSelectedPlace,
    step,
  } = useSearch();

  const steps = [
    {
      title: "Wybór pomieszczenia",
      content: <SearchForm onChangePlace={setSelectedPlace} />,
    },
    {
      title: "Skanowanie przedmiotów",
      content: (
        <Scanner scannedItems={scannedItems} addScannedItem={addScannedItem} />
      ),
    },
    {
      title: "Wynik inwentaryzacji",
      content: (
        <SearchReport
          roomItems={roomItems}
          getComparedItems={getComparedItems}
        />
      ),
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
        {step < steps.length - 1 && (
          <div className={styles.nextStep}>
            <Button
              disabled={!nextStepEnabled}
              type="primary"
              onClick={nextStep}
            >
              Dalej
            </Button>
          </div>
        )}
      </div>
    </Container>
  );
}

export default Search;
