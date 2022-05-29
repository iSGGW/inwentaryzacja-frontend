import { Dispatch, FunctionComponent, SetStateAction, useState } from "react";
import { OnResultFunction, QrReader } from "react-qr-reader";

import styles from "./Scanner.module.css";

type ScannerProps = {
  setScannedData: Dispatch<SetStateAction<string | undefined>>;
};

export const Scanner: FunctionComponent<ScannerProps> = ({
  setScannedData,
}) => {
  const [scanning, setScanning] = useState<boolean>(false);

  const startScanning = () => setScanning(true);
  const handleResults: OnResultFunction = (result) => {
    try {
      const currentResult = result?.getText();
      if (currentResult) {
        setScannedData(currentResult);
        setScanning(false);
      }
    } catch (error) {
      console.error(error);
    }
  };
  const returnOverlay = () => (
    <div className={styles.overlay}>Zeskanuj kod QR</div>
  );

  return (
    <>
      {scanning ? (
        <div className={styles.scannerWrapper}>
          <QrReader
            constraints={{ facingMode: "environment" }}
            containerStyle={{ height: "100%" }}
            onResult={handleResults}
            videoContainerStyle={{ height: "100%", paddingTop: 0 }}
            videoId={"video"}
            videoStyle={{
              position: "unset",
              margin: "0 auto",
              objectFit: "cover",
            }}
            ViewFinder={returnOverlay}
          />
        </div>
      ) : (
        <div className={styles.resetScanner} onClick={startScanning}>
          Zeskanuj kod QR
        </div>
      )}
    </>
  );
};
