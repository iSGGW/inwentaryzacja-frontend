import type { FunctionComponent } from "react";
import { Container } from "src/Components/Container";
import { SearchForm } from "src/Components/SearchForm";
import ModifyTable from "src/Components/ModifyTable/ModifyTable";
import { useModify } from "src/Hooks";

import styles from "./Modify.module.css";

const Modify: FunctionComponent = () => {
  const {
    addNewItem,
    modifyItem,
    deleteItem,
    roomItems,
    selectedPlace,
    setSelectedPlace,
  } = useModify();

  return (
    <Container>
      <div className={styles.modify}>
        <h2 className={styles.title}>Zmodyfikuj stan przedmiotów</h2>
        <div className={styles.searchForm}>
          <SearchForm
            selectedPlace={selectedPlace}
            onChangePlace={setSelectedPlace}
          />
        </div>
        {selectedPlace?.room && (
          <ModifyTable
            addNewItem={addNewItem}
            deleteItem={deleteItem}
            modifyItem={modifyItem}
            roomItems={roomItems}
          />
        )}
      </div>
    </Container>
  );
};

export default Modify;
