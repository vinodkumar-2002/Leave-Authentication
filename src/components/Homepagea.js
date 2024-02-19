import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserAuth } from "../context/AuthContext";
import Loading from "./Loading";

export default function Homepagea({ userdata, appdata }) {
  // Destructure userdata
  const { user } = UserAuth();
  const navigate = useNavigate();
  const [showAlert, setShowAlert] = useState(false);
  const [role, setrole] = useState("no");
  const [newappcount, setnewappcount] = useState(0);

  useEffect(() => {
    if (user !== null) {
      for (const userdatas of userdata) {
        if (userdatas.email === user.email) {
          setrole(userdatas.role);
          console.log(userdatas.role);
          if (userdatas.role === "admin") {
            navigate("/admin/home");
          } else if (userdatas.role === "student") {
            navigate("/home");
          } else if (userdatas.role === "security") {
            navigate("/qrscan");
          }  else {
            navigate("/E404");
          }
          break;
        }
      }
    }
    if (appdata.length > 1) {
      console.log(appdata);

      let count = 0;
      // Loop through the app_data array
      for (let i = 0; i < appdata.length; i++) {
        // Check if the reject property is false
        if (appdata[i].facultyid === "") {
          // Increment count if reject is false
          count++;
        }
      }
      console.log(count);
      setnewappcount(count);
    }
  }, [user, userdata, appdata, navigate]);

  if (user !== null && showAlert === false) {
    for (const userdatas of userdata) {
      if (userdatas.email === user.email) {
        if (
          userdatas.FirstName === "" ||
          userdatas.SurName === "" ||
          userdatas.username === "" ||
          userdatas.year === "" ||
          userdatas.branch === "" ||
          userdatas.section === ""
        ) {
          setShowAlert(true);
        }
      }
    }
  }

  const leavepage = () => {
    if (!showAlert) {
      navigate("/admin/applications");
    }
  };

  return (
    <>
      {role === "admin" ? (
        <>
          {showAlert && role === "admin" && (
            <div
              className="alert alert-primary alert-dismissible fade show mx-3"
              role="alert"
            >
              <strong>
                Update your <a href="/profile">Profile</a> !
              </strong>
              <button
                type="button"
                className="btn-close"
                onClick={(e) => setShowAlert(false)}
                data-bs-dismiss="alert"
                aria-label="Close"
              ></button>
            </div>
          )}
          <div className="container my-2">
            <div className="row my-5">
              <div className="col-lg-6 my-5">
                <h1>Welcome to Leave Authentication Admin Panel</h1>

                <p>
                  This is where you can manage leave requests, users, and system
                  settings.
                </p>
                <button
                  type="button"
                  class="btn btn-primary position-relative"
                  onClick={leavepage}
                >
                  New Application's
                  {newappcount > 0 && (
                    <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                      {newappcount}
                    </span>
                  )}
                  {/* <span class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                    99+
                  </span> */}
                </button>
              </div>
              <div className="col-lg-6 my-3">
                <div
                  id="carouselExampleInterval"
                  className="carousel slide"
                  data-bs-ride="carousel"
                >
                  <div className="carousel-inner">
                    <div
                      className="carousel-item active"
                      data-bs-interval="3000"
                    >
                      <img
                        src="https://images.unsplash.com/photo-1559137781-875af01c14bc?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2069&q=80"
                        className="d-block w-100"
                        alt="..."
                      />
                    </div>
                    <div className="carousel-item" data-bs-interval="3000">
                      <img
                        src="https://images.unsplash.com/photo-1517694712202-14dd9538aa97?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
                        className="d-block w-100"
                        alt="..."
                      />
                    </div>
                    <div className="carousel-item" data-bs-interval="3000">
                      <img
                        src="https://images.unsplash.com/photo-1661169398346-aecdc4f5068b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
                        className="d-block w-100"
                        alt="..."
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      ) : (
        <Loading />
      )}
    </>
  );
}
