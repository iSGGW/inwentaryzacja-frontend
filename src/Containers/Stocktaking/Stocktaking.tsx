import React, { useState } from "react";
import { QrReader, OnResultFunction } from "react-qr-reader";
import "./Stocktaking.css";

function Stocktaking() {
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
    <div className="stocktaking">
      <span onClick={() => setScanning(true)}>Scan QR code</span>
      {scanning && (
        <QrReader
          videoId={"video"}
          constraints={{ facingMode: "environment" }}
          onResult={handleResults}
        />
      )}
      <p>{qrData}</p>
      <span onClick={() => setQrData("No result")}>Reset</span>
    </div>
  );
}

export default Stocktaking;
