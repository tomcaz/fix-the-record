import React, { useEffect, useState } from "react";
import './App.css'

const API_URL = "http://localhost:8080";

interface ITampered {
  tampered: boolean,
  localData: string,
  remoteData: string
}

function App() {
  const [data, setData] = useState<string>();

  useEffect(() => {
    getData();
  }, []);
  const [verifiedData, setVerified] = useState<ITampered>()

  const getData = async () => {
    const response = await fetch(API_URL);
    const { data } = await response.json();
    setData(data);
  };

  const updateData = async () => {
    await fetch(API_URL, {
      method: "POST",
      body: JSON.stringify({ data }),
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    });

    await getData();
  };

  const verifyData = async () => {
    const response = await fetch(`${API_URL}/verify`);
    const { tampered, remoteData, localData } = await response.json();
    setData(remoteData)
    setVerified({ tampered, remoteData, localData })
  };

  return (
    <div
      style={{
        width: "100vw",
        height: "100vh",
        display: "flex",
        position: "absolute",
        padding: 0,
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        gap: "20px",
        fontSize: "30px",
      }}
    >
      <div>Saved Data</div>
      <input
        style={{ fontSize: "30px" }}
        type="text"
        value={data}
        onChange={(e) => setData(e.target.value)}
      />

      <div style={{ display: "flex", gap: "10px" }}>
        <button style={{ fontSize: "20px" }} onClick={updateData}>
          Update Data
        </button>
        <button style={{ fontSize: "20px" }} onClick={verifyData}>
          Verify Data
        </button>
      </div>
      {
        verifiedData &&
        <>
          <h3>{verifiedData.tampered ? 'Tampered found and fixed client data' : 'No Tampered found'}</h3>
          <div className="card">
            <div className="local">
              <h4>User Data</h4>
              {verifiedData.localData}
            </div>
            <div className="remote">
              <h4>User Data from Recovery Source</h4>
              {verifiedData.remoteData}
            </div>
          </div>
        </>
      }
    </div>
  );
}

export default App;
