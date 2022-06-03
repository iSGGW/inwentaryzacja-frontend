import { Dispatch, FunctionComponent, SetStateAction, useState } from "react";
import { OnResultFunction, QrReader } from "react-qr-reader";
import { Button, Modal } from "antd";
import { searchResult } from "src/App/Entities";

import styles from "./Scanner.module.css";
import { QrcodeOutlined } from "@ant-design/icons";

type ScannerProps = {
  setScannedData: Dispatch<SetStateAction<searchResult[] | undefined>>;
};

export const Scanner: FunctionComponent<ScannerProps> = ({
  setScannedData,
}) => {
  const [scanning, setScanning] = useState<boolean>(false);
  const [scannedObject, setScannedObject] = useState<string>();
  const openScannerModal = () => setScanning(true);
  const closeScannerModal = () => setScanning(false);

  const handleResults: OnResultFunction = (result) => {
    try {
      const currentResult = result?.getText();
      if (currentResult) {
        setScannedObject(currentResult);
        setScanning(false);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <div className={styles.formWrapper}>
        <h2>Skanowanie</h2>
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
