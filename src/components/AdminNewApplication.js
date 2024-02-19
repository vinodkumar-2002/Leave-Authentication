import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserAuth } from '../context/AuthContext';
import E404 from './E404';
//import Loading from './Loading';

export default function AdminNewApplication({ userdata, appdata ,setapplication}) {
  const { user } = UserAuth();

  //const [reject, setreject] = useState(false);
  const navigate = useNavigate();
  const [role, setrole] = useState("no");
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

  

  useEffect(() => {
    if (user !== null) {
      for (const userdatas of userdata) {
        if (userdatas.email === user.email) {
          setid(userdatas.id)
          setrole(userdatas.role)
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
  }, [user,userdata]);

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
  

  const showappdata = (item) => {
    for (let i = 0; i < userdata.length; i++) {
      if (userdata[i].id === item.uid) {
        setname(userdata[i].FirstName + " " + userdata[i].SurName);
        setaDate(item.date);
        setYear(userdata[i].year);
        setSection(userdata[i].section);
        setbranch(userdata[i].branch)
        setreason(item.reason);
        break;

      }
    }
  }

  const handleback =  () => {
    navigate('/admin/home');
  }

  const handleaccept = (item) =>{
    setapplication({
      uid : item.id,
      fid : tid,
      allow : true,
      reject : false,
    })
  }

  const handlereject = (item) => {
    setapplication({
      uid : item.id,
      fid : tid,
      allow : false,
      reject : true,
    })
  }

  return (
    <>
      {user === null || role === "no" ? (
        <div className="text-center my-5">
          <div className="spinner-border text-primary" role="status" style={{ width: '4rem', height: '4rem' }}>
          </div>
          <br />
          <span className="visually">Loading..kk.</span>
        </div>
      ) : role === "admin" ? (
        <>
          <div className="mx-3 shadow">
            <div className="my-3 p-3 mx-3 bg-body rounded ">
              <h6 className="border-bottom pb-2 mb-0">Leave Applications</h6>
              {appdata.map((item, index) => (
                item.section === "CSE-A" && (

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
                        <div className="d-flex justify-content-end">
                          {item.date !== date && item.allow === false && item.reject === true ? (
                            <>
                              <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="red" class="bi bi-x-circle-fill" viewBox="0 0 16 16">
                                <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM5.354 4.646a.5.5 0 1 0-.708.708L7.293 8l-2.647 2.646a.5.5 0 0 0 .708.708L8 8.707l2.646 2.647a.5.5 0 0 0 .708-.708L8.707 8l2.647-2.646a.5.5 0 0 0-.708-.708L8 7.293 5.354 4.646z" />
                              </svg>

                            </>
                          ) : item.date !== date && item.allow === true && item.reject === false ? (
                            <>
                              <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="green" class="bi bi-check-circle-fill" viewBox="0 0 16 16">
                                <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z" />
                              </svg>
                            </>

                          ) : item.date !== date && item.allow === false && item.reject === false ? (
                            <>
                              <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="red" class="bi bi-x-circle-fill" viewBox="0 0 16 16">
                                <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM5.354 4.646a.5.5 0 1 0-.708.708L7.293 8l-2.647 2.646a.5.5 0 0 0 .708.708L8 8.707l2.646 2.647a.5.5 0 0 0 .708-.708L8.707 8l2.647-2.646a.5.5 0 0 0-.708-.708L8 7.293 5.354 4.646z" />
                              </svg>
                            </>

                          ) : item.date === date && item.allow === true && item.reject === false ? (
                            <>
                              <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="green" class="bi bi-check-circle-fill" viewBox="0 0 16 16">
                                <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z" />
                              </svg>
                            </>

                          ) : item.date === date && item.allow === false && item.reject === true ? (
                            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="red" class="bi bi-x-circle-fill" viewBox="0 0 16 16">
                              <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM5.354 4.646a.5.5 0 1 0-.708.708L7.293 8l-2.647 2.646a.5.5 0 0 0 .708.708L8 8.707l2.646 2.647a.5.5 0 0 0 .708-.708L8.707 8l2.647-2.646a.5.5 0 0 0-.708-.708L8 7.293 5.354 4.646z" />
                            </svg>

                          ) : (
                            <>
                              <button type="button" className="btn btn-danger" onClick={()=>handlereject(item)}>Reject</button>
                              <button type="button" className="btn btn-success mx-1" onClick={()=>handleaccept(item)}>Accept</button>
                            </>
                          )}
                        </div>

                      </div>
                      <span className="d-block my-2">Roll Number :
                        {item.rollnumber}
                      </span>

                      <span className="d-block my-2">ID :
                        <a href='/'
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
                <button type="button" className="btn btn-primary" onClick={handleback}>Back</button>
              </small>
            </div>
          </div>




          <div className="modal fade" id="staticBackdropapp" tabIndex="-1" aria-labelledby="staticBackdropLabelapp" aria-hidden="true">
            <div className="modal-dialog">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title" id="staticBackdropLabelapp">Id : </h5>
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
        </>
      ) : (
        <>
          <E404/>
        </>
      )}

    </>
  )
}
