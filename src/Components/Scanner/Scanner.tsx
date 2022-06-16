import { Dispatch, FunctionComponent, SetStateAction, useState } from "react";
import { OnResultFunction, QrReader } from "react-qr-reader";
import { Button, Modal } from "antd";
import { QrcodeOutlined } from "@ant-design/icons";

import styles from "./Scanner.module.css";

type ScannerProps = {
  setScannedItems: Dispatch<SetStateAction<string[]>>;
};

export const Scanner: FunctionComponent<ScannerProps> = ({
  setScannedItems,
}) => {
  const [scanning, setScanning] = useState<boolean>(false);
  const openScannerModal = () => setScanning(true);
  const closeScannerModal = () => setScanning(false);

  const handleResults: OnResultFunction = (result) => {
    try {
      const currentResult = result?.getText();
      if (currentResult) {
        setScannedItems((scannedItems) => {
          const newScannedItems = [...scannedItems];
          newScannedItems?.push(currentResult);
          return newScannedItems;
        });
        setScanning(false);
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
    </>
  );
};
