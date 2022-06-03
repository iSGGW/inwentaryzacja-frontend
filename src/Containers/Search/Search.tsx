import { useState } from "react";
import { Container } from "src/Components/Container";
import { SearchForm } from "src/Components/SearchForm";
import { searchResult } from "src/App/Entities";

import styles from "./Search.module.css";
import { Scanner } from "src/Components/Scanner";

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
    </Container>
  );
}

export default Search;
