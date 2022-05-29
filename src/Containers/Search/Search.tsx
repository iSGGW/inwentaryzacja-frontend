import { useState } from "react";
import { Scanner } from "src/Components/Scanner";

import styles from "./Search.module.css";

function Search() {
  const [scannedObject, setScannedObject] = useState<string>();

  return (
    <div className={styles.search}>
      <Scanner setScannedData={setScannedObject} />
      <div>{scannedObject}</div>
    </div>
  );
}

export default Search;
