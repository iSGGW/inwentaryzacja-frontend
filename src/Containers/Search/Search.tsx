import { useState } from "react";
import { QrReader, OnResultFunction } from "react-qr-reader";
import qrCode from "./assets/qrCode.svg";
import { ReaderFrame } from "./assets/ReaderFrame";
import "./Search.css";

function Search() {
  const [qrData, setQrData] = useState<string>("No result");
  const [scanning, setScanning] = useState<boolean>(false);

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
      <img
        src={qrCode}
        onClick={() => setScanning(true)}
        alt={"qr_scanner_button"}
      />
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
      <span onClick={() => setQrData("No result")}>Reset</span>
    </div>
  );
}

export default Search;
