import { useState } from "react";
import { QrReader, OnResultFunction } from "react-qr-reader";
import { ReaderFrame } from "./assets/ReaderFrame";
import "./Search.css";

function Search() {
  const [qrData, setQrData] = useState<string>();
  const [scanning, setScanning] = useState<boolean>(true);

  const handleResults: OnResultFunction = (result) => {
    try {
      const currentResult = result?.getText();
      if (currentResult) {
        setQrData(currentResult);
        setScanning(false);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="search">
      <div className="btnResetQR" onClick={() => setScanning(true)}>
        Zeskanuj ponownie
      </div>
      {scanning && (
        <div className={"qrReaderWrapper"}>
          <QrReader
            ViewFinder={ReaderFrame}
            videoId={"video"}
            constraints={{ facingMode: "environment" }}
            onResult={handleResults}
          />
        </div>
      )}
      <p>{qrData}</p>
    </div>
  );
}

export default Search;
