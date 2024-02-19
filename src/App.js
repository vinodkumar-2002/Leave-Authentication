import { collection, deleteDoc, doc, onSnapshot, query, updateDoc } from '@firebase/firestore';
import React, { useEffect, useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import About from './components/About';
import AdminNewApplication from './components/AdminNewApplication';
import Contactus from './components/Contactus';
import E404 from './components/E404';
import Footer from './components/Footer';
import Homepage from './components/Homepage';
import Homepagea from './components/Homepagea';
import Leave from './components/Leave';
import Loading from './components/Loading';
import Login from './components/Login';
import NavBar from './components/NavBar';
import Profile from './components/Profile';
import QrScan from './components/QrScan';
import Track from './components/Track';
import { AuthContextProvider } from './context/AuthContext';

import { db } from './firebase';

function App() {

  const [userdata, setuserdata] = useState([])
  const [appdata, setappdata] = useState([])
  // const [rolee, setrolee] = useState("");
  // const [f, setf] = useState(false);
  // const [state,setstate] =useState(false);

 

  useEffect(() => {
    const q = query(collection(db, 'users'));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      let dataArr = [];
      querySnapshot.forEach((doc) => {
        dataArr.push({ ...doc.data(), id: doc.id });
      });
      setuserdata(dataArr);

      applicationdb();
    });


    const qu = query(collection(db, 'applications'));
    const applicationdb = onSnapshot(qu, (querySnapshot) => {
      let adataArr = [];
      querySnapshot.forEach((doc) => {
        adataArr.push({ ...doc.data(), id: doc.id });
      });
      setappdata(adataArr);
    });
    return () => unsubscribe();
  }, []);

  //profile.js update profile code
  const saveuserdata = async (userdataToUpdate) => {
    await updateDoc(doc(db, 'users', userdataToUpdate.id), {
      FirstName: userdataToUpdate.fname,
      SurName: userdataToUpdate.sname,
      email: userdataToUpdate.email,
      Phnumber: userdataToUpdate.mobileno,
      year: userdataToUpdate.year,
      branch: userdataToUpdate.branch,
      section: userdataToUpdate.section,
      username: userdataToUpdate.username,
      Gender: userdataToUpdate.gender,
      address: userdataToUpdate.address,
    });
  };
  
  //track.js delete the application
  const deleteapplication = async (appId) => {
    if (appId.id) {
      const appDocRef = doc(db, 'applications', appId.id);
      await deleteDoc(appDocRef);
    }
  }

  ///setrole
  const setapplication = async (data) => {
    await updateDoc(doc(db, 'applications', data.uid), {
      allow : data.allow,
      reject : data.reject,
      facultyid : data.fid,

    });

  }
  
  const setapplicationSecurity = async (data) => {
    await updateDoc(doc(db, 'applications', data.uid), {
      out : data.out,
    });

  }

  // const feedback = async (data) => {
  //   await updateDoc(doc(db, 'applications', data.uid), {
  //     allow : data.allow,
  //     reject : data.reject,
  //     facultyid : data.fid,

  //   });

  // }
  

  return (
    <React.StrictMode>
      <BrowserRouter>
        <AuthContextProvider>
          <NavBar />
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/lo" element={<Loading   />}/>
            <Route path="/home" element={<Homepage userdata={userdata}   />} />
            <Route path="/admin/home" element={<Homepagea userdata={userdata} appdata={appdata}  />} />
            <Route path="/admin/applications" element={<AdminNewApplication  userdata={userdata} appdata={appdata} setapplication={setapplication}/>} />
            <Route path="/leave" element={<Leave userdata={userdata} saveuserdata={saveuserdata}  />} />
            <Route path="/about" element={<About  />} />
            <Route path="/contactus" element={<Contactus  />} />
            <Route path="/profile" element={<Profile userdata={userdata} saveuserdata={saveuserdata}  />} />
            <Route path="admin/profile" element={<Profile userdata={userdata} saveuserdata={saveuserdata}  />} />
            <Route path="/track" element={<Track userdata={userdata} appdata={appdata} deleteapplication={deleteapplication}  />} />
            <Route path="/E404" element={<E404 />} />
            <Route path="/qrscan" element={<QrScan appdata={appdata} setapplicationSecurity={setapplicationSecurity}/>}  />
            
          </Routes>
          <Footer />
        </AuthContextProvider>
      </BrowserRouter>
    </React.StrictMode>
  );
}

export default App;
