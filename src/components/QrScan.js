import QRCode from "qrcode.react";
import React, { useEffect, useState } from "react";
import QrScanner from "react-qr-scanner";

const qrCodeStyle = {
  textAlign: "center",
  position: "relative",
  width: "200px",
  height: "200px",
  margin: "0 auto",
};

const qrCodeImageStyle = {
  backgroundImage: 'url("URL_OF_YOUR_GENERATED_QR_CODE_IMAGE")',
  backgroundRepeat: "no-repeat",
  backgroundPosition: "center center",
  backgroundSize: "contain",
  width: "100%",
  height: "100%",
};

const movingLineStyle = {
  position: "absolute",
  background: "#007bff",
  width: "100%",
  height: "3px",
  top: "0",
  left: "0",
  animation: "moveLine 4s linear infinite",
};

const keyframes = `
  @keyframes moveLine {
    0% {
      top: 0;
    }
    50% {
      top: 70%;
    }
    100% {
      top: 0;
    }
  }
`;

export default function QrScan({ appdata ,setapplicationSecurity}) {
  const [date, setdate] = useState("");
  const [result, setResult] = useState("");
  const [scanning, setScanning] = useState(false);
  const [enterid, setenterid] = useState(false);
  const [match, setmatch] = useState(false);
  const [year, setyear] = useState("");
  const [allowuser, setallowuser] = useState(false);
  const [inputid, setinputid] = useState("");
  const [Id, setId] = useState("");

  //
  useEffect(() => {
    const interval = setInterval(() => {
      const currentDate = new Date();
      setdate(currentDate.toLocaleDateString());
    }, 1000); // Update the current date every second

    return () => {
      clearInterval(interval); // Clean up the interval when the component unmounts
    };
  }, [result, appdata]);

  //sort the application adat according to date
  // appdata.sort((a, b) => {
  // const dateA = new Date(
  //     a.date.split('/').reverse().join('/') // Convert 'DD/MM/YYYY' to 'YYYY/MM/DD'
  // );
  // const dateB = new Date(
  //     b.date.split('/').reverse().join('/') // Convert 'DD/MM/YYYY' to 'YYYY/MM/DD'
  // );

  // return dateB - dateA;
  // });

  const handleScan = (data) => {
    if (data) {
      setResult(data.text);
      setScanning(false);
      setmatch(false);
      compareResult(data.text);
    }
  };
  //console.log(appdata);

  const compareResult = (ids) => {
    if (Array.isArray(appdata)) {
      //console.log(ids)
      for (const userdatas of appdata) {
        //console.log("id" + userdatas.id);
        // console.log(userdatas)
        if (userdatas.id === ids) {
          if (userdatas.date === date && userdatas.allow === true && userdatas.out === false) {
            setallowuser(true);
            setapplicationSecurity({
              uid : userdatas.id,
              out : true,

            })
          }
          setmatch(true);
          break;
        }
      }
      // setmatch(true);
    }
  };

  const handleError = (error) => {
    console.error(error);
  };

  const startScanning = () => {
    setScanning(true);
  };
  const enteridf = () => {
    setenterid(true);
  };
  const nextfunction = () => {
    setResult(Id);
    setmatch(false)
    setenterid(false);
    setinputid(Id.toString());
    compareResult(Id);
  };
  return (
    <>
      <div className="container my-2 ">
        <div className="row my-5">
          <div className="col-lg-6 my-5 ">
            <h1>Welcome to Leave Authentication Security Check Panel</h1>

            <p>
              This is where you can verify your identity and access sensitive
              information or perform security-sensitive actions. Please proceed
              with the security check to continue.
            </p>
          </div>
          <div className="col-lg-6 my-3">
            <div className="container rounded bg-white mt-1 mb-1  bg-body rounded">
              {/* <h1 className='text-center'>Validate User</h1> */}
              <div className="row">
                <div className="col">
                  <div className="shadow-lg p-3">
                    {scanning === true ? (
                      <>
                        <h1 className="text-center">Scan QR Code </h1>
                        <div className="container mt-5 ">
                          <style>{keyframes}</style>
                          <div style={qrCodeStyle}>
                            <div style={movingLineStyle}></div>
                            <div className="my-3" style={qrCodeImageStyle}>
                              <QrScanner
                                onError={handleError}
                                onScan={handleScan}
                                style={{ width: "90%" }}
                              />
                            </div>
                          </div>
                        </div>
                        <div className="d-flex justify-content-end">
                          <button
                            type="button"
                            className="btn btn-primary my-3 mx-2 "
                            onClick={() => setScanning(false)}
                          >
                            Back
                          </button>
                        </div>
                      </>
                    ) : enterid === true ? (
                      <>
                        <h1 className="text-center">Enter Id </h1>
                        <div className="mt-5 text-center">
                          <div className="">
                            <input
                              type="text"
                              className="form-control"
                              required
                              placeholder="ID"
                              value={Id}
                              onChange={(e) => setId(e.target.value)}
                            />
                          </div>
                          <br />
                          <button
                            type="button"
                            className="btn btn-primary my-3 mx-2"
                            onClick={nextfunction}
                          >
                            Next
                          </button>
                          <button
                            type="button"
                            className="btn btn-primary my-3"
                            onClick={() => {
                              setenterid(false);
                            }}
                          >
                            Back
                          </button>
                        </div>
                      </>
                    ) : scanning === false &&
                      enterid === false &&
                      result !== "" ? (
                      <div className="mt-5 text-center">
                        {/* {match === false ? (
                          <Loading />
                        ) : ( */}
                          <div className="mt-5 text-center">
                            {allowuser === true && match === true ? (
                              <div>
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  width="150"
                                  height="150"
                                  fill="green"
                                  className="bi bi-check-circle-fill my-3"
                                  viewBox="0 0 16 16"
                                >
                                  <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z" />
                                </svg>
                              </div>
                            ) : (
                              <div>
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  width="150"
                                  height="150"
                                  fill="red"
                                  class="bi bi-x-circle-fill my-3"
                                  viewBox="0 0 16 16"
                                >
                                  <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM5.354 4.646a.5.5 0 1 0-.708.708L7.293 8l-2.647 2.646a.5.5 0 0 0 .708.708L8 8.707l2.646 2.647a.5.5 0 0 0 .708-.708L8.707 8l2.647-2.646a.5.5 0 0 0-.708-.708L8 7.293 5.354 4.646z" />
                                </svg>
                              </div>
                            )}
                            ID : {result}
                            <br />
                            <button
                              type="button"
                              className="btn btn-primary my-3 mx-2"
                              onClick={() => {
                                setResult("");
                              }}
                            >
                              Back
                            </button>
                          </div>
                        {/* )} */}
                      </div>
                    ) : (
                      <>
                        <h1 className="text-center">Validate User</h1>
                        <div className="mt-5 text-center">
                          <div className="container mt-5">
                            <style>{keyframes}</style>
                            <div style={qrCodeStyle}>
                              <div style={movingLineStyle}></div>
                              <div className="my-3" style={qrCodeImageStyle}>
                                <QRCode value={"vinod"} size={128} />
                              </div>
                            </div>
                          </div>
                          <button
                            type="button"
                            className="btn btn-primary my-3"
                            onClick={startScanning}
                          >
                            Scan QR
                          </button>
                          <button
                            type="button"
                            className="btn btn-primary my-3 mx-2"
                            onClick={enteridf}
                          >
                            Enter ID
                          </button>
                        </div>
                      </>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
