import React, { useEffect, useState } from "react";
import { GoogleButton } from "react-google-button";
import { useLocation, useNavigate } from "react-router-dom";
import { UserAuth } from "../context/AuthContext";

const Login = () => {
  const location = useLocation();
  //console.log(location.pathname)
  //email and password
  //login
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const { signInEmail, createUserWithEmail, googlesignIn, user } = UserAuth();

  //signup
  const [fname, setfname] = useState("");
  const [sname, setsname] = useState("");
  const [semail, setsemail] = useState("");
  const [scpassword, setscpassword] = useState("");
  const [smnumber, setsmnumber] = useState("");
  const [username, setusername] = useState("");
  const [syear, setsyear] = useState("");
  const [sbranch, setsbranch] = useState("");
  const [ssection, setssection] = useState("");
  const [sgender, setsgender] = useState("");
  const [spassword, setspassword] = useState("");

  const handlelogin = (e) => {
    e.preventDefault(); // Prevent default form submission
    signInEmail(email, password); // Call signInEmail function with email and password
  };

  const handlesignup = async () => {
    try {
      if (spassword === scpassword) {
        // Passwords match, proceed with user creation
        createUserWithEmail(
          semail,
          spassword,
          fname,
          sname,
          smnumber,
          ssection,
          sbranch,
          syear,
          sgender,
          username
        );
      } else {
        // Passwords do not match
        console.log("Passwords do not match");
      }
    } catch (error) {
      // Handle any errors that occur during user creation
      console.error("Error during user creation:", error);
    }
  };

  //google login

  const navigate = useNavigate();
  const handlegooglesignin = async () => {
    try {
      await googlesignIn();
      //console.log('knsdkn');
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (user != null) {
      navigate("/home");
    }
  }, [user]);

  //log
  const [isLogin, setIsLogin] = useState(true);
  const toggleForm = () => {
    setIsLogin(!isLogin);
  };

  return (
    <div>
      <div
        className="container1 d-flex justify-content-center align-items-center"
        style={{ minHeight: "60vh", position: "relative" }}
      >
        <div>
          {isLogin ? (
            <form id="login-form" onSubmit={handlelogin}>
              <div className="container rounded bg-white mt-1 mb-1 shadow-lg p-3  bg-body rounded text-center">
                <h1>Sign-in</h1>
                <div className="form-group my-2">
                  <input
                    type="text"
                    className="form-control"
                    name="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setemail(e.target.value)}
                    required
                  />
                </div>
                <div className="form-group">
                  <input
                    type="password"
                    className="form-control"
                    name="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setpassword(e.target.value)}
                    required
                  />
                </div>
                <div class="d-grid gap-2 col-12 mx-auto">
                  <button
                    type="submit"
                    className=" btn btn-primary my-3 "
                    onClick={handlelogin}
                  >
                    Login
                  </button>
                </div>
                <p className="text-center my-">(OR)</p>
                <GoogleButton onClick={handlegooglesignin} />
                <hr />
                <p className="text-center mt-3">
                  Don't have an account?
                  <a href="#" onClick={toggleForm}>
                    Sign Up
                  </a>
                </p>
              </div>
            </form>
          ) : (
            <form id="signup-form" onSubmit={handlesignup}>
              <div className="container rounded bg-white mt-1 mb-1 shadow-lg p-3  bg-body rounded ">
                <h1 className="text-center">Sign-in</h1>
                <div className="row">
                  <div className="">
                    <div className=" shadow-pop">
                      <div className="row mt-2">
                        <div className="col-md-6 py-2">
                          <input
                            type="text"
                            className="form-control"
                            required
                            placeholder="First Name"
                            value={fname}
                            onChange={(e) => setfname(e.target.value)}
                          />
                        </div>
                        <div className="col-md-6 py-2">
                          <input
                            type="text"
                            className="form-control"
                            value={sname}
                            required
                            placeholder="Surname"
                            onChange={(e) => setsname(e.target.value)}
                          />
                        </div>
                      </div>
                      <div className="row mt-2">
                        <div className="col-md-6 py-2">
                          <input
                            type="text"
                            className="form-control"
                            required
                            placeholder="Email Id"
                            value={semail}
                            onChange={(e) => setsemail(e.target.value)}
                          />
                        </div>
                        <div className="col-md-6 py-2">
                          <input
                            type="text"
                            className="form-control"
                            required
                            placeholder="Phone Number"
                            value={smnumber}
                            onChange={(e) => setsmnumber(e.target.value)}
                          />
                        </div>
                        <div className="col-md-6 py-2">
                          <input
                            type="password"
                            className="form-control"
                            required
                            placeholder="Password"
                            value={scpassword}
                            onChange={(e) => setscpassword(e.target.value)}
                          />
                        </div>
                        <div className="col-md-6 py-2">
                          <input
                            type="password"
                            className="form-control"
                            required
                            placeholder="Re-enter Password"
                            value={spassword}
                            onChange={(e) => setspassword(e.target.value)}
                            style={{
                              borderColor:
                                spassword === scpassword ? "" : "red",
                            }}
                          />
                        </div>
                      </div>
                      <div className="row mt-2">
                        <div className="col-md-6 py-2">
                          <input
                            type="text"
                            className="form-control"
                            required
                            placeholder="UserName / Roll Number"
                            value={username}
                            onChange={(e) => setusername(e.target.value)}
                          />
                        </div>
                        <div className="col-md-6 py-2"></div>
                      </div>
                      <div className="row mt-2">
                        <div className="col-md-4 py-2">
                          <select
                            className="form-select"
                            aria-label="Default select example"
                            value={syear}
                            onChange={(e) => setsyear(e.target.value)}
                            required
                          >
                            <option selected>Year</option>
                            <option value="I">I</option>
                            <option value="II">II</option>
                            <option value="III">III</option>
                            <option value="IV">IV</option>
                          </select>
                        </div>
                        <div className="col-md-4 py-2">
                          <select
                            className="form-select"
                            aria-label="Default select example"
                            value={sbranch}
                            onChange={(e) => setsbranch(e.target.value)}
                            required
                          >
                            <option selected>Branch</option>
                            <option value="CSE">CSE</option>
                            <option value="IT">IT</option>
                            <option value="MECH">Mech</option>
                            <option value="EEE">EEE</option>
                            <option value="ECE">ECE</option>
                          </select>
                        </div>
                        <div className="col-md-4 py-2">
                          <select
                            className="form-select"
                            aria-label="Default select example"
                            value={ssection}
                            onChange={(e) => setssection(e.target.value)}
                            required
                          >
                            <option selected>Section</option>
                            <option value="A">A</option>
                            <option value="B">B</option>
                            <option value="C">C</option>
                            <option value="IT">IT</option>
                          </select>
                        </div>
                      </div>

                      <div className="row mt-0">
                        <div className="col-md-12">
                          <label className="labels">Gender</label>
                          <div className="row">
                            <div className="col-md-1">
                              <div className="form-check">
                                <input
                                  className="form-check-input"
                                  type="radio"
                                  name="gender"
                                  id="male"
                                  required
                                  onChange={() => setsgender("male")}
                                />
                                <label
                                  className="form-check-label"
                                  htmlFor="male"
                                >
                                  Male
                                </label>
                              </div>
                            </div>
                            <div className="col-md-1">
                              <div className="form-check">
                                <input
                                  className="form-check-input"
                                  type="radio"
                                  name="gender"
                                  id="female"
                                  onChange={() => setsgender("female")}
                                />
                                <label
                                  className="form-check-label"
                                  htmlFor="female"
                                >
                                  Female
                                </label>
                              </div>
                            </div>
                            <div className="col-md-1">
                              <div className="form-check">
                                <input
                                  className="form-check-input"
                                  type="radio"
                                  name="gender"
                                  id="other"
                                  onChange={() => setsgender("other")}
                                />
                                <label
                                  className="form-check-label"
                                  htmlFor="other"
                                >
                                  Other
                                </label>
                              </div>
                            </div>
                            <div className="col-md-9"></div>
                          </div>
                        </div>
                      </div>

                      <div className="mt-5 text-center">
                        <button
                          type="submit"
                          className="btn btn-primary my-3"
                          onClick={handlesignup}
                        >
                          Signup
                        </button>
                      </div>
                      <hr />
                      <p className="text-center mt-3">
                        Already has a account?
                        <a href="#" onClick={toggleForm}>
                          Log in
                        </a>
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* <div className="form-group my-2" style={{ paddingTop: '55px' }}>
                        <input type="text"
                           className="form-control"
                           name="Username"
                           placeholder="Username"
                           value={susername}
                           onChange={(e) => setsusername(e.target.value)}
                           required />
                     </div>
                     <div className="form-group my-2">
                        <input type="email"
                           className="form-control"
                           name="email"
                           placeholder="Email"
                           value={semail}
                           onChange={(e) => setsemail(e.target.value)}
                           required />
                     </div>
                     <div className="form-group my-2">
                        <input type="password"
                           className="form-control"
                           name="password"
                           placeholder="Password"
                           value={spassword}
                           onChange={(e) => setspassword(e.target.value)}
                           required />
                     </div>
                     <button type="submit" className="btn btn-primary my-3">Signup</button> */}
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
export default Login;
