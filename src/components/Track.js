import QRCode from 'qrcode.react';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserAuth } from '../context/AuthContext';

export default function Track({ userdata, appdata, deleteapplication }) {
  const {  user } = UserAuth();

  const [qrid, setqrid] = useState("");
  const [tid, setid] = useState("");
  const [date, setdate] = useState("");

  // const [rollno, setrollno] = useState("");
  const [mname, setname] = useState("");
  const [reason, setreason] = useState("");
  const [section, setSection] = useState("");
  const [adate, setaDate] = useState("");
  // const [sec, setSec] = useState("");
  const [branch, setbranch] = useState("");
  const [year, setYear] = useState("");
  const [Id, setId] = useState("");
  console.log(appdata)

  useEffect(() => {
    if (user !== null) {
      for (const userdatas of userdata) {
        if (userdatas.email === user.email) {
          setid(userdatas.id)
          console.log(userdatas.id)
        }
      }
    }

    const interval = setInterval(() => {
      const currentDate = new Date();
      setdate(currentDate.toLocaleDateString());
    }, 1000); // Update the current date every second

    return () => {
      clearInterval(interval); // Clean up the interval when the component unmounts
    };
  }, [userdata]);

  //sort the application data according to Date in reverse
  if (appdata.length > 1) {
    appdata.sort((a, b) => {
      if (a.date && b.date) {
        const dateA = new Date(a.date.split('/').reverse().join('/'));
        const dateB = new Date(b.date.split('/').reverse().join('/'));
  
        return dateB - dateA;
      } else {
        console.error("Error: 'date' property is not defined for one or both objects.");
        return 0; // No change in order
      }
    });
  }
  
  
  // Now, appdata is sorted in descending order by date if its length is greater than 1
  


  const showqr = (item) => {
    //e.preventDefault();
    // onClick={()=>showqr(item.id)}
    //alert(id)
    setqrid(item.id);
    setdate(item.date);

  }

  const showappdata = (item) => {
    for (let i = 0; i < userdata.length; i++) {
      if (userdata[i].id === item.uid) {
        setname(userdata[i].FirstName + " " + userdata[i].SurName);
        setaDate(item.date);
        setYear(userdata[i].year);
        setSection(userdata[i].section);
        setbranch(userdata[i].branch)
        setreason(item.reason);
        setId(item.id);
        break;

      }
    }
  }

  const deleteapplicationf = (item) => {
    deleteapplication({
      id: item.id
    }
    );
  }

  const navigate = useNavigate();
  const handleback = () => {
    navigate('/home');
  }
  return (
    <>
      {user === null && tid === ""? (
        <div className="text-center my-5">
          <div className="spinner-border text-primary" role="status" style={{ width: '4rem', height: '4rem' }}>
          </div>
          <br />
          <span className="visually">Loading...</span>
        </div>
      ) : (
        <>
      <div className="mx-3 shadow">
        <div className="my-3 p-3 mx-3 bg-body rounded ">
          <h6 className="border-bottom pb-2 mb-0">Leave Applications</h6>
          {appdata.map((item, index) => (
            item.uid === tid && (

              <div className="d-flex text-muted pt-3" key={index}>
                <svg
                  className="bd-placeholder-img flex-shrink-0 me-2 rounded"
                  width="32"
                  height="32"
                  xmlns="http://www.w3.org/2000/svg"
                  role="img"
                  aria-label="Placeholder: 32x32"
                  preserveAspectRatio="xMidYMid slice"
                  focusable="false"
                >
                  <title>Placeholder</title>
                  <rect width="100%" height="100%" fill="#007bff"></rect>
                  <text x="50%" y="50%" fill="#007bff" dy=".3em">
                    32x32
                  </text>
                </svg>

                <div className=" small lh-sm border-bottom w-100">
                  <div className="d-flex justify-content-between">
                    <strong className="text-gray-dark">{item.date}</strong>
                    {
                      item.reject === true || (item.allow === false   && item.date !== date)?
                        (
                          <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="red" class="bi bi-x-circle-fill" viewBox="0 0 16 16">
                            <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM5.354 4.646a.5.5 0 1 0-.708.708L7.293 8l-2.647 2.646a.5.5 0 0 0 .708.708L8 8.707l2.646 2.647a.5.5 0 0 0 .708-.708L8.707 8l2.647-2.646a.5.5 0 0 0-.708-.708L8 7.293 5.354 4.646z" />
                          </svg>
                        ) : (
                          item.allow === false && item.out === false  && item.date === date ?
                            (
                              <div>
                                {/* <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="#007bff" class="bi bi-trash3-fill" viewBox="0 0 16 16"  onClick={() => deleteapplication({ delid: index.id })}>
                                  <path d="M11 1.5v1h3.5a.5.5 0 0 1 0 1h-.538l-.853 10.66A2 2 0 0 1 11.115 16h-6.23a2 2 0 0 1-1.994-1.84L2.038 3.5H1.5a.5.5 0 0 1 0-1H5v-1A1.5 1.5 0 0 1 6.5 0h3A1.5 1.5 0 0 1 11 1.5Zm-5 0v1h4v-1a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5ZM4.5 5.029l.5 8.5a.5.5 0 1 0 .998-.06l-.5-8.5a.5.5 0 1 0-.998.06Zm6.53-.528a.5.5 0 0 0-.528.47l-.5 8.5a.5.5 0 0 0 .998.058l.5-8.5a.5.5 0 0 0-.47-.528ZM8 4.5a.5.5 0 0 0-.5.5v8.5a.5.5 0 0 0 1 0V5a.5.5 0 0 0-.5-.5Z" />
                                </svg> */}
                                <button type="button" class="btn btn-primary" fdprocessedid="vwgli75"  onClick={() => deleteapplicationf(item)}>
                                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash3-fill" viewBox="0 0 16 16" style={{ marginRight: '10px' }}>
                                    <path d="M11 1.5v1h3.5a.5.5 0 0 1 0 1h-.538l-.853 10.66A2 2 0 0 1 11.115 16h-6.23a2 2 0 0 1-1.994-1.84L2.038 3.5H1.5a.5.5 0 0 1 0-1H5v-1A1.5 1.5 0 0 1 6.5 0h3A1.5 1.5 0 0 1 11 1.5Zm-5 0v1h4v-1a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5ZM4.5 5.029l.5 8.5a.5.5 0 1 0 .998-.06l-.5-8.5a.5.5 0 1 0-.998.06Zm6.53-.528a.5.5 0 0 0-.528.47l-.5 8.5a.5.5 0 0 0 .998.058l.5-8.5a.5.5 0 0 0-.47-.528ZM8 4.5a.5.5 0 0 0-.5.5v8.5a.5.5 0 0 0 1 0V5a.5.5 0 0 0-.5-.5Z"></path>
                                  </svg>
                                  Delete
                                </button>
                              </div>
                            ) : (
                              item.allow === true && item.out === false && item.date === date ?
                                (
                                  <button
                                    type="button"
                                    className="btn btn-primary"
                                    data-bs-toggle="modal"
                                    data-bs-target="#staticBackdrop"
                                    onClick={() => showqr(item)}
                                  >
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-qr-code" viewBox="0 0 16 16" style={{ marginRight: '10px' }}>
                                      <path d="M2 2h2v2H2V2Z"></path>
                                      <path d="M6 0v6H0V0h6ZM5 1H1v4h4V1ZM4 12H2v2h2v-2Z"></path>
                                      <path d="M6 10v6H0v-6h6Zm-5 1v4h4v-4H1Zm11-9h2v2h-2V2Z"></path>
                                      <path d="M10 0v6h6V0h-6Zm5 1v4h-4V1h4ZM8 1V0h1v2H8v2H7V1h1Zm0 5V4h1v2H8ZM6 8V7h1V6h1v2h1V7h5v1h-4v1H7V8H6Zm0 0v1H2V8H1v1H0V7h3v1h3Zm10 1h-1V7h1v2Zm-1 0h-1v2h2v-1h-1V9Zm-4 0h2v1h-1v1h-1V9Zm2 3v-1h-1v1h-1v1H9v1h3v-2h1Zm0 0h3v1h-2v1h-1v-2Zm-4-1v1h1v-2H7v1h2Z"></path>
                                      <path d="M7 12h1v3h4v1H7v-4Zm9 2v2h-3v-1h2v-1h1Z"></path>
                                    </svg>
                                    Show QR
                                  </button>
                                ) : (
                                  <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="green" class="bi bi-check-circle-fill" viewBox="0 0 16 16">
                                    <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z" />
                                  </svg>
                                )
                            )
                        )
                    }
                  </div>

                  <span className="d-block my-2">ID :
                    <a href='#'
                      data-bs-toggle="modal"
                      data-bs-target="#staticBackdropapp"
                      onClick={() => showappdata(item)}
                    >{item.id}
                    </a>
                  </span>
                </div>
              </div>
            )
          ))}
          <small className="d-block text-end mt-3">
            <button type="button" class="btn btn-primary" onClick={handleback}>Back</button>
          </small>
        </div>
      </div>



      
      <div className="modal fade" id="staticBackdrop" tabIndex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="staticBackdropLabel">Scan QR Code</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body d-flex justify-content-center my-3">
              {qrid && (
                <QRCode value={qrid} size={128} />
              )}

            </div>
            <div className="modal-body d-flex justify-content-center ">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="orange" class="bi bi-clock-fill my-1 mx-2" viewBox="0 0 16 16">
                <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM8 3.5a.5.5 0 0 0-1 0V9a.5.5 0 0 0 .252.434l3.5 2a.5.5 0 0 0 .496-.868L8 8.71V3.5z" />
              </svg> Valid till {date}, 4:00 pm
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-primary" data-bs-dismiss="modal">Done</button>
            </div>
          </div>
        </div>
      </div>

      
      <div className="modal fade" id="staticBackdropapp" tabIndex="-1" aria-labelledby="staticBackdropLabelapp" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="staticBackdropLabelapp">Id : {Id}</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body  justify-content-center my-3">
              <div className="col-lg-12 my-0 ">
                <p className="col-lg-12 mx-3 ">
                  {adate}.<br />
                  To <br />
                  The Class Incharge,<br />
                  {year} {branch}-{section},<br />
                  NNRG.<br />

                  Respected Ma'am,<br />
                  &emsp;&emsp;{reason}.
                  <br /><br />
                  Thanking You,<br />
                  {mname}<br />
                </p>
              </div>

            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-primary" data-bs-dismiss="modal">Done</button>
            </div>
          </div>
        </div>
      </div>
      </>)}
    </>
  );
}
