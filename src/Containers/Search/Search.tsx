import { useState } from "react";
import { Container } from "src/Components/Container";
import { Description } from "src/Components/Description/Description";
import { SearchForm } from "src/Components/SearchForm";
import { Scanner } from "src/Components/Scanner";
import { SearchTable } from "src/Components/SearchTable";
import { searchResult } from "src/App/Entities";
import { useSearch } from "src/Hooks";

import styles from "./Search.module.css";

function Search() {
  const { selectedPlace, setSelectedPlace, roomItems } = useSearch();
  const [openedResult, setOpenedResult] = useState<searchResult>();

  return (
    <Container>
      <div className={styles.search}>
        <SearchForm
          selectedPlace={selectedPlace}
          onChangePlace={setSelectedPlace}
        />
        {/*<Scanner setScannedData={setSearchApiResponse} />*/}
      </div>
      {roomItems && (
        <>
          <Description result={openedResult} />
          <SearchTable results={roomItems} setOpenedResult={setOpenedResult} />
        </>
      )}
    </Container>
  );
}

export default Search;
