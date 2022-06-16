import { useState } from "react";
import type { FunctionComponent } from "react";
import { QrReader } from "react-qr-reader";
import type { OnResultFunction } from "react-qr-reader";
import { Button, Modal } from "antd";
import { QrcodeOutlined } from "@ant-design/icons";

import styles from "./Scanner.module.css";

type ScannerProps = {
  addScannedItem: (item: string) => void;
  scannedItems: string[];
};

export const Scanner: FunctionComponent<ScannerProps> = ({
  addScannedItem,
  scannedItems,
}) => {
  const [scanning, setScanning] = useState<boolean>(false);
  const openScannerModal = () => setScanning(true);
  const closeScannerModal = () => setScanning(false);

  const handleResults: OnResultFunction = (result) => {
    try {
      const currentResult = result?.getText();
      if (currentResult) {
        addScannedItem(currentResult);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <div className={styles.formWrapper}>
        <div className={styles.form}>
          <Button
            icon={<QrcodeOutlined />}
            onClick={openScannerModal}
            shape={"circle"}
          />
        </div>
      </div>
      <Modal
        centered
        className={styles.modal}
        destroyOnClose
        onCancel={closeScannerModal}
        visible={scanning}
        width={"auto"}
      >
        <div className={styles.scannerWrapper}>
          <h3>Skanowanie QR</h3>
          <QrReader
            constraints={{ facingMode: "environment" }}
            containerStyle={{ height: "97%" }}
            onResult={handleResults}
            videoContainerStyle={{ height: "100%", paddingTop: 0 }}
            videoId={"video"}
            videoStyle={{
              position: "unset",
              margin: "0 auto",
              objectFit: "cover",
            }}
          />
        </div>
      </Modal>
      {scannedItems.length > 0 && (
        <div>Zeskanowane ID: {scannedItems.join(", ")}</div>
      )}
    </>
  );
};
