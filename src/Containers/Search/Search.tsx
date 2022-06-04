import { useState } from "react";
import { Container } from "src/Components/Container";
import { SearchForm } from "src/Components/SearchForm";
import { Scanner } from "src/Components/Scanner";
import { SearchTable } from "src/Components/SearchTable";
import { searchResult } from "src/App/Entities";

import styles from "./Search.module.css";

function Search() {
  const [searchApiResponse, setSearchApiResponse] = useState<searchResult[]>();

  return (
    <Container>
      <div className={styles.search}>
        <SearchForm setApiResponse={setSearchApiResponse} />
        <div className={styles.dividerWrapper}>
          <div className={styles.divider} />
        </div>
        <Scanner setScannedData={setSearchApiResponse} />
      </div>
      {
        //TODO: Add Description component with the details of a selected item
        searchApiResponse && <SearchTable results={searchApiResponse} />
      }
    </Container>
  );
}

export default Search;
