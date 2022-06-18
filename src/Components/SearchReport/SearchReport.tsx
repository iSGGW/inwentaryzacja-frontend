import type { FunctionComponent } from "react";
import { useEffect, useState } from "react";
import { Spin } from "antd";
import { Description } from "src/Components/Description";
import { SearchTable } from "src/Components/SearchTable";
import type { searchResult } from "src/App/Entities";

import styles from "./SearchReport.module.css";

interface SearchReportProps {
  getComparedItems: () => void;
  roomItems: searchResult[] | undefined;
}

export const SearchReport: FunctionComponent<SearchReportProps> = ({
  getComparedItems,
  roomItems,
}) => {
  const [openedResult, setOpenedResult] = useState<searchResult>();

  useEffect(() => getComparedItems(), []);

  return roomItems ? (
    <>
      <Description result={openedResult} />
      <SearchTable results={roomItems} setOpenedResult={setOpenedResult} />
    </>
  ) : (
    <div className={styles.spinner}>
      <Spin size={"large"} />
    </div>
  );
};
