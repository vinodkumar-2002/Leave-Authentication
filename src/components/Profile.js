import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserAuth } from '../context/AuthContext';
import Loading from './Loading';



const Profile = ({ userdata, saveuserdata }) => {
    const navigate = useNavigate();

    //user for profile url
    const {  user } = UserAuth();
    // State for showing/hiding alert
    const [showAlert, setShowAlert] = useState(false);
    console.log(user);
    

    const [fname, setfname] = useState("");
    // fname,sname,email,username,mobileno,year,branch,section,[gender,address,
    const [sname, setsname] = useState("");
    const [email, setemail] = useState("");
    const [username, setusername] = useState("");
    const [mobileno, setmobileno] = useState("");
    const [year, setyear] = useState("");
    const [branch, setbranch] = useState("");
    const [section, setsection] = useState("");
    const [gender, setgender] = useState("");
    const [address, setaddress] = useState("");
    const [id, setid] = useState("");

    //db
    // const usercollectionref = collection(db, "users");
    // const [datadb, setdata] = useState("");

    //
    const handleSaveProfile = () => {
        // Save the profile data here
        saveuserdata({
            id: id,
            fname: fname,
            sname: sname,
            email: email,
            username: username,
            mobileno: mobileno,
            year: year,
            branch: branch,
            section: section,
            gender: gender,
            address: address,

        })

        // Hide the alert
        setShowAlert(true);
        navigate('/profile');
    };


    useEffect(() => {
        for (const userdatas of userdata) {
            if (userdatas.email === user.email) {
                setid(userdatas.id)
                //console.log(userdata);
                setfname(userdatas.FirstName)
                setsname(userdatas.SurName)
                setemail(userdatas.email)
                setusername(userdatas.username)
                setmobileno(userdatas.Phnumber)
                setyear(userdatas.year)
                setbranch(userdatas.branch)
                setsection(userdatas.section)
                setgender(userdatas.Gender)
                setaddress(userdatas.address)
                break;
            }
        }
    }, [user, userdata]);
    console.log(userdata)

    return (
        <>
            {user === null || id === "" ?
                (
                    <Loading />
                ) : (
                    <div className="container rounded bg-white mt-5 mb-5">
                        {showAlert && (
                            <div className="alert alert-primary alert-dismissible fade show" role="alert">
                                <strong>Your Profile Has Saved!</strong>
                                <button type="button" className="btn-close" onClick={(e) => setShowAlert(false)} ></button>
                            </div>
                        )}
                        <div className="row">
                            <div className="col-md-5 border-right">
                                <div className="d-flex flex-column align-items-center text-center">
                                    <img className="rounded-circle shadow mt-5"
                                        width="180px"
                                        src={user.photoURL ? user.photoURL : "data:image/jpeg;base64,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"}
                                    /><br />
                                    <span className="font-weight-bold">{fname + " " + sname}</span>
                                    <span className="text-black-50">{email}</span>
                                    <span> </span>
                                </div>
                            </div>
                            <div className="col-md-5 border-right">
                                <div className="p-2 py-3">
                                    {/* <div className="d-flex justify-content-between align-items-center mb-3">
                                        <h4 className="text-right">Profile Settings</h4>
                                    </div> */}
                                    <div className="row mt-2">
                                        <div className="col-md-6"><label className="labels">First Name</label><input type="text" className="form-control" value={fname} onChange={(e) => setfname(e.target.value)} placeholder="First name" /></div>
                                        <div className="col-md-6"><label className="labels">Surname</label><input type="text" className="form-control" value={sname} onChange={(e) => setsname(e.target.value)} placeholder="Suname" /></div>
                                    </div>
                                    <div className="row mt-3">
                                        <div className="col-md-12 py-2"><label className="labels">Email ID</label><input type="text" className="form-control" placeholder="Email id" value={email} onChange={(e) => setemail(e.target.value)} /></div>
                                        <div className="col-md-12 py-2"><label className="labels">User Name</label><input type="text" className="form-control" placeholder="User Name" value={username} onChange={(e) => setusername(e.target.value)} /></div>
                                        <div className="col-md-12 py-2"><label className="labels">Mobile Number</label><input type="text" className="form-control" placeholder="phone number" value={mobileno} onChange={(e) => setmobileno(e.target.value)} /></div>
                                    </div>
                                    <div className="row mt-2">
                                        <div className="col-md-6"><label className="labels">Year</label>
                                            <select className="form-select" aria-label="Default select example" value={year} onChange={(e) => setyear(e.target.value)}>
                                                <option selected  >Year</option>
                                                <option value="I" selected={year === "I"}>I</option>
                                                <option value="II" selected={year === "II"}>II</option>
                                                <option value="III" selected={year === "III"}>III</option>
                                                <option value="IV" selected={year === "IV"}>IV</option>
                                            </select>
                                        </div>
                                        <div className="col-md-6"><label className="labels">Branch</label>
                                            <select className="form-select" aria-label="Default select example" value={branch} onChange={(e) => setbranch(e.target.value)}>
                                                <option selected>Branch</option>
                                                <option value="CSE" selected={branch === "CSE"}>CSE</option>
                                                <option value="IT" selected={branch === "IT"}>IT</option>
                                                <option value="MECH" selected={branch === "MECH"}>Mech</option>
                                                <option value="EEE" selected={branch === "EEE"}>EEE</option>
                                                <option value="ECE" selected={branch === "ECE"}>ECE</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div className="row mt-2">
                                        <div className="col-md-12">
                                            <label className="labels">Section</label>
                                            <select className="form-select" aria-label="Default select example" value={section} onChange={(e) => setsection(e.target.value)}>
                                                <option selected  >Section</option>
                                                <option value="A" selected={section === "A"}>A</option>
                                                <option value="B" selected={section === "B"}>B</option>
                                                <option value="C" selected={section === "C"}>C</option>
                                                <option value="IT" selected={section === "IT"}>IT</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div className="row mt-2">

                                        <div className="col-md-12">
                                            <label className="labels">Gender</label>
                                            <div className="container">
                                                <div className="form-check">
                                                    <input
                                                        className="form-check-input"
                                                        type="radio"
                                                        name="gender"
                                                        id="male" // Unique ID for the "male" option
                                                        checked={gender === "male"}
                                                        onChange={() => setgender("male")}
                                                    />
                                                    <label className="form-check-label" htmlFor="male">Male</label>
                                                </div>
                                                <div className="form-check">
                                                    <input
                                                        className="form-check-input"
                                                        type="radio"
                                                        name="gender"
                                                        id="female" // Unique ID for the "female" option
                                                        checked={gender === "female"}
                                                        onChange={() => setgender("female")}
                                                    />
                                                    <label className="form-check-label" htmlFor="female">Female</label>
                                                </div>
                                                <div className="form-check">
                                                    <input
                                                        className="form-check-input"
                                                        type="radio"
                                                        name="gender"
                                                        id="other" // Unique ID for the "other" option
                                                        checked={gender === "other"}
                                                        onChange={() => setgender("other")}
                                                    />
                                                    <label className="form-check-label" htmlFor="other">Other</label>
                                                </div>

                                            </div>
                                        </div>

                                    </div>
                                    <div className="row mt-3">
                                        <div className="col-md-12 py-2"><label className="labels">Address</label><input type="text" className="form-control" placeholder="Address " value={address} onChange={(e) => setaddress(e.target.value)} /></div>
                                    </div>

                                    <div className="mt-5 text-center">
                                        <button className="btn btn-primary profile-button" type="button"
                                            onClick={handleSaveProfile}

                                        >
                                            Save Profile</button>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                )}



        </>
    );
}

export default Profile;
