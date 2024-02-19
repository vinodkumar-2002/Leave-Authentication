import { addDoc, collection } from '@firebase/firestore';
import React, { useEffect, useState } from 'react';
import { UserAuth } from '../context/AuthContext';
import { db } from '../firebase';


export default function Leave({userdata}) {
    const { logout, user } = UserAuth();

    const [id, setid] = useState("");
    const [rollno, setrollno] = useState("");
    const [mname, setname] = useState("");
    const [reason, setreason] = useState("");
    const [section, setSection] = useState("");
    const [date,setCurrentDate] = useState("");
    const [sec, setSec] = useState("");
    const [branch, setbranch] = useState("");
    const [year, setYear] = useState("");
    
    const [check, setcheck] = useState("none");
    const [formh, setformh] = useState("block");
    //back button
    const back = () => {
        //setrollno("");
        //setname("");
        setreason("");
        //setSection("");
        //setYear("");
        setcheck("none");
        setformh("block");
    };
    //handle form request
    const usercollectionref = collection(db, "applications");
    const handleSubmit = async (e) => {
        e.preventDefault();
         if (reason === "" ) {
            alert("Fill the reason details");
        }
        else {

            await addDoc(usercollectionref, {
                rollnumber: rollno,
                uid : id,
                //name: mname,
                reason: reason,
                section: section,
                year: year,
                facultyid : "",
                date : date,
                allow : false,
                out : false,
                reject : false,
               
            });

            //chand page
            setcheck("block");
            setformh("none");

        }
    };

    //data from app.js
    useEffect(() => {
        for (const userdatas of userdata) {
            if (userdatas.email === user.email) {
                console.log(userdatas)
                setid(userdatas.id)
                setrollno(userdatas.username)
                setname(userdatas.FirstName+" "+userdatas.SurName)
                setSection(userdatas.branch+"-"+userdatas.section)
                setSec(userdatas.section)
                setbranch(userdatas.branch)
                setYear(userdatas.year)
                break;
            }
        }
        const interval = setInterval(() => {
            const currentDate = new Date();
            setCurrentDate(currentDate.toLocaleDateString());
          }, 1000); // Update the current date every second
      
          return () => {
            clearInterval(interval); // Clean up the interval when the component unmounts
          };
    }, [userdata]); // Add [userdata] as a dependency to run the effect when the 'userdata' prop changes
    //console.log(user);

    return (
        <>
            <form>
                <div className="container1 " style={{ display: formh }}>

                    <main className="container" style={{ width: '90%' }}>

                        <div className="d-flex align-items-center p-3 my-3 text-white rounded shadow-sm" style={{ backgroundColor: 'blue' }}>
                            <div className="lh-1">
                                <h1 className="h6 mb-0 lh-1">Take leave</h1>
                            </div>
                        </div>

                        <div className="my-1 p-3 bg-body rounded shadow">
                            
                            <div className="col-lg-10 my-5 mb-3">
                                <p className="col-lg-12 mx-3 mb-3">
                                    {date}.<br />
                                    To <br/>
                                    The class incharge,<br />
                                    {year}<br/>
                                    {section},<br />
                                    NNRG.<br />

                                    Respected Ma'am,<br/>
                                    <div className="mb-3">
                                        <textarea className="form-control my-3" name="reason" required id="reason" rows="6" value={reason} onChange={(e) => setreason(e.target.value)} placeholder="Reason"></textarea>
                                    </div>
                                    Thanking You,<br/>
                                    {mname}<br />
                                </p>
                            </div>
                            {/* <div className="mb-3">
                                <label htmlFor="rollno" className="form-label">
                                    Roll Number
                                </label>
                                <input type="text" className="form-control" id="rollno" required name="rollno" value={rollno} onChange={(e) => setrollno(e.target.value)} placeholder="Roll Number" />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="name" className="form-label">
                                    Name
                                </label>
                                <input type="text" className="form-control" id="name" required name="name" value={mname} onChange={(e) => setname(e.target.value)} placeholder="Name" />
                            </div>

                            <div className="mb-3">
                                <label htmlFor="reason" className="form-label">
                                    Reason
                                </label>
                                <textarea className="form-control" name="reason" required id="reason" rows="3" value={reason} onChange={(e) => setreason(e.target.value)} placeholder="Reason"></textarea>
                            </div> */}

                            {/* <div className="mb-3">
                                <label className="form-label">Section</label>
                            </div>
                            <div className="form-check">
                                <input
                                    className="form-check-input"
                                    type="radio"
                                    name="sec"
                                    id="flexRadioDefault1"
                                    value="a"
                                    required
                                    checked={section === "a"} // Check if section is "a"
                                    onChange={(e) => setSection(e.target.value)}
                                />
                                <label className="form-check-label" htmlFor="flexRadioDefault1">
                                    A
                                </label>
                            </div>
                            <div className="form-check">
                                <input
                                    className="form-check-input"
                                    type="radio"
                                    name="sec"
                                    id="flexRadioDefault2"
                                    value="b"
                                    checked={section === "b"} // Check if section is "b"
                                    onChange={(e) => setSection(e.target.value)}
                                />
                                <label className="form-check-label" htmlFor="flexRadioDefault2">
                                    B
                                </label>
                            </div>
                            <div className="form-check">
                                <input
                                    className="form-check-input"
                                    type="radio"
                                    name="sec"
                                    id="flexRadioDefault3"
                                    value="a"
                                    checked={section === "c"} // Check if section is "c"
                                    onChange={(e) => setSection(e.target.value)}
                                />
                                <label className="form-check-label" htmlFor="flexRadioDefault3">
                                    C
                                </label>
                            </div>
                            <div className="form-check">
                                <input
                                    className="form-check-input"
                                    type="radio"
                                    name="sec"
                                    id="flexRadioDefault4"
                                    value="b"
                                    checked={section === "IT"} // Check if section is "it"
                                    onChange={(e) => setSection(e.target.value)}
                                />
                                <label className="form-check-label" htmlFor="flexRadioDefault2">
                                    IT
                                </label>
                            </div> */}
                            {/* <div className="mb-3">
                                <label className="form-label">Year</label>
                            </div>
                            <div className="form-check">
                                <input
                                    className="form-check-input"
                                    type="radio"
                                    name="year"
                                    id="y1"
                                    value="1"
                                    required
                                    checked={year === "1"} // Check if year is "1"
                                    onChange={(e) => setYear(e.target.value)}
                                />
                                <label className="form-check-label" htmlFor="y1">
                                    I
                                </label>
                            </div>

                            <div className="form-check">
                                <input
                                    className="form-check-input"
                                    type="radio"
                                    name="year"
                                    id="y2"
                                    value="2"
                                    checked={year === "2"} // Check if year is "2"
                                    onChange={(e) => setYear(e.target.value)}
                                />
                                <label className="form-check-label" htmlFor="y1">
                                    II
                                </label>
                            </div>
                            <div className="form-check">
                                <input
                                    className="form-check-input"
                                    type="radio"
                                    name="year"
                                    id="y3"
                                    value="3"
                                    checked={year === "3"} // Check if year is "3"
                                    onChange={(e) => setYear(e.target.value)}
                                />
                                <label className="form-check-label" htmlFor="y1">
                                    III
                                </label>
                            </div>
                            <div className="form-check">
                                <input
                                    className="form-check-input"
                                    type="radio"
                                    name="year"
                                    id="y4"
                                    value="4"
                                    checked={year === "4"} // Check if year is "4"
                                    onChange={(e) => setYear(e.target.value)}
                                />
                                <label className="form-check-label" htmlFor="y1">
                                    IV
                                </label>
                            </div> */}
                        </div>
                        <button onClick={handleSubmit} id="submit" className="btn btn-primary my-3">
                            Submit
                        </button>
                    </main >
                </div >
            </form>

            {
                //check mark
            }
            <div className="container2" style={{ display: check }}>
                <main>
                    <section className="py-5 text-center container">
                        <div className="row py-lg-5">
                            <div className="col-lg-6 col-md-8 mx-auto">
                                <svg xmlns="http://www.w3.org/2000/svg" width="150" height="150" fill="green"
                                    className="bi bi-check-circle-fill" viewBox="0 0 16 16">
                                    <path
                                        d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z" />
                                </svg>
                                <p className="lead text-muted">
                                    Your leave application has been received. We will review your request and get back to you shortly
                                </p>
                                <p>
                                    <a href="/track" className="btn btn-primary my-2 mx-2">Track Leave Application</a>
                                    <a href="#" className="btn btn-secondary my-2" onClick={back}>Back</a>
                                </p>
                            </div>
                        </div>
                    </section>
                </main>
            </div>
        </>
    );
}



