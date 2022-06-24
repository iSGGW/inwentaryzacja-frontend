import type { FunctionComponent } from "react";
import { QrReader } from "react-qr-reader";
import type { OnResultFunction } from "react-qr-reader";
import { Button } from "antd";

import styles from "./Scanner.module.css";

type ScannerProps = {
  addScannedItem: (item: string) => void;
  scannedItems: string[];
};

export const Scanner: FunctionComponent<ScannerProps> = ({
  addScannedItem,
  scannedItems,
}) => {
  const handleResults: OnResultFunction = (result) => {
    const currentResult = result?.getText();
    if (currentResult) {
      if (!scannedItems.includes(currentResult)) {
        addScannedItem(currentResult);
      }
    }
  };

  //TODO: Just for testing purposes - to be deleted
  const addRandomJson = () => {
    const randomJson: string = (Math.random() + 1).toString(36).substring(7);
    const object = JSON.stringify({ id: randomJson });
    addScannedItem(object);
  };

  return (
    <>
      <div className={styles.scannerWrapper}>
        <QrReader
          constraints={{ facingMode: "environment" }}
          containerStyle={{ maxHeight: "50vh" }}
          onResult={handleResults}
          videoContainerStyle={{ height: "50vh", paddingTop: 0 }}
          videoId={"video"}
          videoStyle={{
            position: "unset",
            margin: "0 auto",
            objectFit: "cover",
          }}
        />
      </div>
      <h3>Zeskanowane ID: {scannedItems.join(", ")}</h3>
      <Button onClick={addRandomJson}>add random JSON</Button>
    </>
  );
};
