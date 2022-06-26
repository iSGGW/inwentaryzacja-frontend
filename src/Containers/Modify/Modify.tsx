import type { FunctionComponent } from "react";
import { useContext, useEffect } from "react";

import { UserContext } from "src/App/App";
import { Container } from "src/Components/Container";
import { SearchForm } from "src/Components/SearchForm";
import ModifyTable from "src/Components/ModifyTable/ModifyTable";
import { useModify } from "src/Hooks";

import styles from "./Modify.module.css";

const Modify: FunctionComponent = () => {
  const {
    addNewItem,
    removeItem,
    loadingItems,
    modifyItem,
    roomItems,
    selectedPlace,
    setSelectedPlace,
    setToken,
    setRoom,
  } = useModify();

  const userContext = useContext(UserContext);

  useEffect(() => {
    setToken(userContext.user.token);
  }, []);

  return (
    <Container>
      <div className={styles.modify}>
        <h2 className={styles.title}>Zmodyfikuj stan przedmiotów</h2>
        <div className={styles.searchForm}>
          <SearchForm onChangePlace={setSelectedPlace} setRoom={setRoom} />
        </div>
        {selectedPlace?.room && (
          <ModifyTable
            addNewItem={addNewItem}
            deleteItem={removeItem}
            loadingItems={loadingItems}
            modifyItem={modifyItem}
            roomItems={roomItems}
          />
        )}
      </div>
    </Container>
  );
};

export default Modify;
