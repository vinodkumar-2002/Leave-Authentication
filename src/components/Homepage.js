import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserAuth } from '../context/AuthContext';
import Loading from './Loading';

export default function Homepage({ userdata }) { // Destructure userdata
    const { user } = UserAuth();
    const navigate = useNavigate();
    const [showAlert, setShowAlert] = useState(false);
    const [role, setrole] = useState("no");
    console.log(user)
    useEffect(() => {
        if (user != null) {
            //navigate('/home');
            for (const userdatas of userdata) {
                if (userdatas.email === user.email) {
                    setrole(userdatas.role)
                    console.log(userdatas.role)
                    if (userdatas.role === "admin") {
                        navigate('/admin/home');
                    }
                    else if(userdatas.role === "student") {
                        navigate('/home');
                    }else if (userdatas.role === "security") {
                        navigate("/qrscan");
                      }
                    else{
                        navigate('/E404')
                    }
                    break;
                }
            }
        }
        
    }, [user, userdata]);

    if (user !== null && showAlert === false) {
        for (const userdatas of userdata) {
            if (userdatas.email === user.email) {
                if (userdatas.FirstName === "" || userdatas.SurName === "" || userdatas.username === "" || userdatas.year === "" || userdatas.branch === "" || userdatas.section === "") {
                    setShowAlert(true)
                }
            }

        }
    }
   
    const leavepage = () => {
        if (!showAlert) {
            navigate('/leave');
        }
        else{
            alert("Update ur profile");
        }
    }

    const trackleave = () => {
        navigate('/track');
    }

    return (
        <>


            {role === "no" ? (
                <Loading />
            ) : (
                <>
                    {
                        showAlert && (
                            <div className="alert alert-primary alert-dismissible fade show mx-3" role="alert">
                                <strong>Update your <a href='/profile'>Profile</a> !</strong>
                                <button type="button" className="btn-close" onClick={(e) => setShowAlert(false)} data-bs-dismiss="alert" aria-label="Close"></button>
                            </div>
                        )
                    }
                    <div className="container my-2">
                        <div className="row my-5">
                            <div className="col-lg-6 my-5">
                                <h1>Welcome to the Leave Authentication Application</h1>
                                <p>Apply for leave and get it authenticated quickly.</p>
                                <button className="btn btn-primary" onClick={leavepage}>
                                    Apply for Leave
                                </button>
                                <button className="btn btn-success mx-3" onClick={trackleave}>
                                    Track Application
                                </button>
                            </div>
                            <div className="col-lg-6 my-3">
                                <div id="carouselExampleInterval" className="carousel slide" data-bs-ride="carousel">
                                    <div className="carousel-inner">
                                        <div className="carousel-item active" data-bs-interval="3000">
                                            <img src="https://images.unsplash.com/photo-1559137781-875af01c14bc?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2069&q=80" className="d-block w-100" alt="..." />
                                        </div>
                                        <div className="carousel-item" data-bs-interval="3000">
                                            <img src="https://images.unsplash.com/photo-1517694712202-14dd9538aa97?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80" className="d-block w-100" alt="..." />
                                        </div>
                                        <div className="carousel-item" data-bs-interval="3000">
                                            <img src="https://images.unsplash.com/photo-1661169398346-aecdc4f5068b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80" className="d-block w-100" alt="..." />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </>
            )}



        </>
    );
}
